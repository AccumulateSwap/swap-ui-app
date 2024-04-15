import { Popover, Radio } from "antd";
import { SettingOutlined } from "@ant-design/icons";

function SlippagePopover({slippage, setSlippage}) {

    function handleSlippageChange(e) {
        setSlippage(e.target.value);
    }

    const settings = (
        <>
            <div>Slippage Tolerance</div>
            <div>
                <Radio.Group value={slippage} onChange={handleSlippageChange} defaultValue={2.5}>
                    <Radio.Button value={0.5}>0.5%</Radio.Button>
                    <Radio.Button value={2.5}>2.5%</Radio.Button>
                    <Radio.Button value={5}>5.0%</Radio.Button>
                </Radio.Group>
            </div>
        </>
    );

    return (
        <Popover
            content={settings}
            title="Settings"
            trigger="click"
            placement="bottomRight"
        >
            <SettingOutlined className="cog" />
        </Popover>
    );
}

export default SlippagePopover;