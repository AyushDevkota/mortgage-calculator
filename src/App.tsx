import { useState } from "react";
import RangeInput from "./components/RangeInput";
import { formatCurrency } from "./utils";

function App() {
  const [mortgageData, setMortgageData] = useState({
    "purchase-price": 0,
    "down-payment": 0,
    "repayment-time": 0,
    "interest-rate": 0,
  });

  const loanAmount =
    mortgageData["purchase-price"] - mortgageData["down-payment"];

  const monthlyInterestRate = mortgageData["interest-rate"] / 12 / 100;

  const numberofPayments = mortgageData["repayment-time"] * 12;

  const temp = (1 + monthlyInterestRate) ** numberofPayments;

  const result = loanAmount * ((monthlyInterestRate * temp) / (temp - 1)) || 0;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMortgageData({ ...mortgageData, [e.target.name]: e.target.value });
  };

  return (
    <main className="bg-gray-200 h-screen flex justify-between items-center">
      <div className="w-2/5 mx-auto border-8 border-white rounded-lg px-3 py-5">
        <h1 className="font-semibold mb-6">Mortgage Calculator</h1>

        <div className="grid grid-cols-3 gap-x-8 gap-y-3">
          <div className="flex flex-col gap-2">
            <RangeInput
              label="Purchase Price"
              name="purchase-price"
              value={mortgageData["purchase-price"]}
              max={500000}
              type="currency"
              handleInputChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <RangeInput
              label="Down Payment"
              name="down-payment"
              value={mortgageData["down-payment"]}
              max={mortgageData["purchase-price"]}
              type="currency"
              handleInputChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <RangeInput
              label="Repayment Time"
              name="repayment-time"
              value={mortgageData["repayment-time"]}
              max={25}
              type="time"
              handleInputChange={handleFormChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <RangeInput
              label="Interest Rate"
              name="interest-rate"
              value={mortgageData["interest-rate"]}
              max={15}
              type="rate"
              handleInputChange={handleFormChange}
            />
          </div>
          <div>
            <h3 className="text-xs">Loan Amount</h3>
            <p>{formatCurrency(loanAmount)}</p>
          </div>
          <div>
            <h3 className="text-xs">Estimated pr. month</h3>
            <p>{formatCurrency(result)}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
