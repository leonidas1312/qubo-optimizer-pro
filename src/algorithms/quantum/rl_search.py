import torch
import numpy as np
import time

def softmax(x, temperature=1.0):
    """Calculate softmax probabilities"""
    e_x = np.exp((x - np.max(x)) / temperature)
    return e_x / e_x.sum()

def calculate_percentile(input_values, q):
    """Calculate percentile"""
    return np.percentile(input_values, q)

def rescaled_rank_rewards(current_value, previous_values, q=1):
    """Rescaled rank rewards"""
    Cq = calculate_percentile(previous_values, q)
    print(f"Percentile cost: {Cq}")
    if current_value < Cq:
        return -(q / 100)
    elif current_value > Cq:
        return 1 - q / 100
    else:
        return 1 if torch.rand(1).item() > 0.5 else -1

def simulated_annealing(current_cost, new_cost, temperature):
    """Simulated annealing acceptance criterion"""
    if new_cost < current_cost:
        return True
    else:
        return True

def simplified_rl_search(bitstring, QUBO_matrix, const, time_limit, temperature=10, verbose=False, progress_callback=None):
    """
    Reinforcement learning local search with progress updates
    """
    device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
    QUBO_matrix = torch.tensor(QUBO_matrix, dtype=torch.float32, device=device)
    const = torch.tensor(const, dtype=torch.float32, device=device)
    initial_bitstring = torch.tensor(bitstring, dtype=torch.float32, device=device)
    
    best_state = initial_bitstring.clone()
    state = initial_bitstring.clone()
    num_bits = len(bitstring)
    bit_flip_counts = np.zeros(num_bits)
    bit_flip_total_rewards = np.zeros(num_bits)
    best_cost = torch.matmul(state, torch.matmul(QUBO_matrix, state)) + const
    progress_costs = [best_cost.item()]
    cut_values = [best_cost.item()]
    P = 100
    
    start_time = time.time()
    while not time_limit or (time.time() - start_time) < time_limit:
        total_actions = np.sum(bit_flip_counts)
        
        if total_actions > 0:
            ucb_scores = bit_flip_total_rewards / (bit_flip_counts + 1e-5)
            ucb_scores += np.sqrt(2 * np.log(total_actions) / (bit_flip_counts + 1e-5))
            bit_to_flip = np.argmax(ucb_scores)
        else:
            bit_to_flip = np.random.choice(num_bits)
            
        new_state = state.clone()
        new_state[bit_to_flip] = 1 - new_state[bit_to_flip]
        new_cost = torch.matmul(new_state, torch.matmul(QUBO_matrix, new_state)) + const
        
        # Send progress update through callback
        if progress_callback:
            progress_callback({
                'current_cost': new_cost.item(),
                'best_cost': best_cost.item(),
                'iteration_cost': new_cost.item()
            })
        
        progress_costs.append(new_cost.item())
        
        if simulated_annealing(best_cost.item(), new_cost.item(), temperature):
            if new_cost.item() < best_cost.item():
                best_state = new_state
                best_cost = new_cost
            state = new_state
            cut_values.append(new_cost.item())
            cut_values = cut_values[-P:]
            
        bit_flip_total_rewards[bit_to_flip] += rescaled_rank_rewards(new_cost.item(), cut_values)
        bit_flip_counts[bit_to_flip] += 1

        if verbose:
            print(f"Current cost: {new_cost.item()}, Best cost: {best_cost.item()}")

    return best_state.cpu().numpy(), best_cost.cpu().numpy(), progress_costs