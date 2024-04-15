import { parseUnits, formatUnits } from 'viem';

export class TokenAmountHelper {
    // Converts token count to minimum decimal units
    tokenToUnits(input, decimals){
        const units = input ? parseUnits(input, decimals) : 0;
        return units;
    }

    // Converts minimal token units to token count
    unitsToTokens(input, decimals) {
        const tokens = input ? formatUnits(input, decimals) : "";
        return tokens;
    }
}