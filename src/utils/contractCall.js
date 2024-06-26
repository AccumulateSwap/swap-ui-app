import { readContract, writeContract, estimateGas, estimateFeesPerGas, estimateMaxPriorityFeePerGas } from '@wagmi/core'
import { encodeFunctionData } from 'viem'
import { wagmiConfig } from "../components/Web3Provider";
import { ROUTER_ABI, ERC20 } from "./abis";

// ccn: No hardcode allowed
const routerAddress = "0x03ceF4E045dCe576f1d0cf6e83058DC34F730Dc5";

export class ContractCall {

    // Returns ERC20 token balance of an address
    async balanceOf(ERC20Address, spenderAddress) {
        const result = await readContract(wagmiConfig, {
            address: ERC20Address,
            abi: ERC20,
            functionName: 'balanceOf',
            args: [
                spenderAddress,
            ],
        });

        return result;
    }

    // Call to approve ERC20 token transfer by router
    async approveERC20(ERC20Address, spenderAddress, tokenUnits) {
        const result = await writeContract(wagmiConfig, {
            address: ERC20Address,
            abi: ERC20,
            functionName: 'approve',
            args: [
                spenderAddress,
                tokenUnits
            ],
        });

        console.log(result);
    }

    // Function to check token amount approved by owner
    async allowanceERC20(ERC20Address, ownerAddress, spenderAddress) {
        const result = await readContract(wagmiConfig, {
            address: ERC20Address,
            abi: ERC20,
            functionName: 'allowance',
            args: [
                ownerAddress, spenderAddress
            ],
        });

        return result;
    }

    // Function call for `swapExactTokensForTokens`
    async swapForExactTokens(amountIn, amountOutMin, token1, token2, to) {

        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes
        const allowedAmount = await this.allowanceERC20(token1.address, to, routerAddress);

        // console.log(allowedAmount > amountIn);

        if (allowedAmount < amountIn) {
            // console.log("Need approval");
            await this.approveERC20(token1.address, routerAddress, amountIn);
        }

        // if (await this.allowanceERC20(token1.address, to, routerAddress) >= amountIn) {
        //     console.log("Yeaaah. Approved");
        // }

        const result = await writeContract(wagmiConfig, {
            address: routerAddress,
            abi: ROUTER_ABI,
            functionName: 'swapExactTokensForTokens',
            args: [
                amountIn, // The amount of input tokens you want to swap
                amountOutMin, // The minimum amount of output tokens you want to receive
                [token1.address, token2.address],
                to, // The address to receive the output tokens
                deadline // A Unix timestamp after which the transaction will revert
            ],
        });

        console.log(result);
    }

    // code-change-needed: No hardcode allowed
    async estimateSwapGas(amountIn, amountOutMin, token1, token2, to) {
        // console.log(amountIn, amountOutMin, token1, token2, to);

        const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes

        const _data = encodeFunctionData({
            abi: ROUTER_ABI,
            functionName: 'swapExactTokensForTokens',
            args: [
                amountIn, // The amount of input tokens you want to swap
                amountOutMin, // The minimum amount of output tokens you want to receive
                [token1.address, token2.address],
                to, // The address to receive the output tokens
                deadline // A Unix timestamp after which the transaction will revert
            ],
        });

        const result = await estimateGas(wagmiConfig, {
            data: _data,
            to: routerAddress,
            value: 0,
        })

        return result;

    }

    async estimateFeesPerGas() {
        const result = await estimateFeesPerGas(wagmiConfig);
        console.log("estimateFeesPerGas", result.formatted);
    }

    async estimateMaxPriorityFeesPerGas() {
        const result = await estimateMaxPriorityFeePerGas(wagmiConfig);
        console.log("estimateMaxPriorityFeesPerGas", result);
    }
}