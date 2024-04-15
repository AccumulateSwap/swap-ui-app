# Accumulate Swap

`// ccn` Code change needed \
`// lfa` Look for alternative

# Code review v0.0 Fixes

- ✅ organise images 
- ✅ add more components
- ✅ Move `isNumber::Swap.jsx` to utils
- ✅ Move `slipage` to ENV variables
- ✅ Rename `tokenOne` to `tokenInfoOne`
- ✅ create a variable called `targetedTokenSelection` 
- ✅ create a constant called `CONST_targetedTokenSelection_is_1` 
- ✅ create a constant called `CONST_targetedTokenSelection_is_2`
- ✅ `TokenAmountHelper` Class
-  Move to typescript
- ✅ `TokenInfoAmoutClass` Class name
- ✅ `tokenInfoAmout` Global Instance
- ✅ `TokenInfoAmoutClass` has tokenInfo Property, Amount Property, Format method, Orginal Amount



FEE structure
--------------

- Base fee (set by network) GWEI
- Priority fee (Optional) GWEI
- `Total Gas fee per unit gas = Base fee + Priority fee`
- `Total Gas Fee in GWEI = Total Fee per Gas Unit * Gas Used`
