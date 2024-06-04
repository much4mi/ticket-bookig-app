

type Props = {
    selectedPricePerGame?: number;
    onChange: (value: number) => void;
};

const PriceFilters = ({ selectedPrice, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">MAXPRICE</h4>
            <select className="p-2 border rounded-md w-full" value={selectedPrice} onChange={(event) => onChange(event.target.value ? parseInt(event.target.value) : undefined)}>
                <option value="">Select max price</option>
                {[200, 300, 400, 500, 1000].map((price) => (
                    <option key={price} value={price}>{price}</option>
                ))}
            </select>
        </div>
    );
};

export default PriceFilters;


