class BigInt_Math {

    static max(...values) {
        if (values.length == 0) {
            return(null);
        }
        let max_val = values[0]
        for (var val of values) {
            if (max_val < val) {
                max_val = val;
            }
        }
        return(max_val);
    }

    static min(...values) {
        if (values.length == 0) {
            return(null);
        }
        let max_val = values[0]
        for (var val of values) {
            if (max_val > val) {
                max_val = val;
            }
        }
        return(max_val);
    }

    static sign(value) {
        if (value > 0n) {
            return(1n)
        }
        else if (value < 0n) {
            return(-1n)
        }
        return(0n)
    }

    static abs(value) {
        let sign = this.sign(value)
        return(sign * value)
    }

    static log(value, base = 2n) {
        if (!(base > 0n)) {
            return(NaN)
        }
        if (!(value > 0n)) {
            return(NaN)
        }
        
        let mul_counter = 0n;
        let base_power = 1n;
        
        while(base_power < value) {
            base_power = base * base_power;
            mul_counter = mul_counter + 1n;
        }

        return(mul_counter);
    }

}