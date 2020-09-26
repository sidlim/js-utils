


// TODO: Memoization/pure function optimizations


class Discrete_Distribution {

    cdf;
    outcome_map;
    cumulative_prob;

    constructor(prob_mass_fn, domain) {

        let outcome_count = 0;
        this.cumulative_prob = 0;
        this.cdf = [];
        this.outcome_map = [];

        for (var outcome of domain) {

            this.cdf[outcome_count] = this.cumulative_prob;
            this.outcome_map[outcome_count] = outcome;
            this.cumulative_prob += prob_mass_fn(outcome);
            outcome_count++;
        
        }

    }

    cdf_search(val) {
        let left = 0;
        let right = this.cdf.length;
        let mid = Math.floor((left + right) / 2);
        
        while (right - left > 1) {
            if (this.cdf[mid] <= val) {
                left = mid;
            }
            else {
                right = mid;
            }
        }

        return(this.outcome_map[left]);
    }

    rejection_sample(sample_count, uniform_unit_RNG = Math.random) {
        
        let sample = [];

        for (var i = 0; i < sample_count; i++) {
            let rand_num = uniform_unit_RNG();
            while (rand_num > this.cumulative_prob) {
                rand_num = uniform_unit_RNG();
            }
            sample[i] = this.cdf_search(rand_num);
        }

        return(sample);
    }

    * rejection_sampler (uniform_unit_RNG = Math.random) {
        
        let rand_num = uniform_unit_RNG();
        
        while (true) {

            while (rand_num > this.cumulative_prob) {
                rand_num = uniform_unit_RNG();
            }
    
            yield this.cdf_search(rand_num);
    
        }
    }

}

class Continuous_Distribution {

    pdf;
    domain_map;
    max_domain_map_density;

    constructor(prob_density_function, domain_map = (x) => x, max_domain_map_density = 1) {
        this.pdf = prob_density_function;
        this.domain_map = domain_map;
        this.max_domain_map_density = max_domain_map_density;
    }

    rejection_sample(sample_count, uniform_unit_RNG = Math.random) {

        let sample = [];

        for (var i = 0; i < sample_count; i++) {
            let domain_element = this.domain_map(uniform_unit_RNG());
            let y_val = uniform_unit_RNG();

            while (y_val < this.max_domain_map_density * this.prob_density_function()) {
                
            }
        }

    }
}