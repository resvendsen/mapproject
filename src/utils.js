/* e is an event object and f is a function to be executed when a space or CR is pressed */
function handleKeyPress(e, f) {
	if (e.which === 13 || e.which === 32) {
		e.stopPropagation()
		return f()
	}
}

/* the incr and decr functions use the remaindering operator (%) which can return negative
 * values rather than always returning 0 thru modulus - 1.  Since we always want a non-negative number
 * the incr and decr functions behave accordingly.  */
// val is the value to be incremented, i is the increment, mod is the modulus
let incr = (val, i, mod) => {
	return ((((val + i) % mod) + mod) % mod)
}

// val is the value to be decremented, i is the decrement, mod is the modulus
let decr = (val, i, mod) => {
	return ((((val - i) % mod) + mod) % mod)
}

export {handleKeyPress}
export {incr}
export {decr}