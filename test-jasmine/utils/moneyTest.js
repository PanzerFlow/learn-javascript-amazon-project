import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', ()=>{
    it('converts cents into dollars',() => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
    it('test decimal round down',() => {
        expect(formatCurrency(2095.1)).toEqual('20.95');
    });
    it('test decimal round up',() => {
        expect(formatCurrency(2095.9)).toEqual('20.96');
    });
})

