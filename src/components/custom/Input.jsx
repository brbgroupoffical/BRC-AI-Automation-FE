
import { Input } from "../ui/input"
const InputField = ({ label, id, placeholder, value, onChange, type,error }) => {
    return (
        <>
            <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium">
                    {label}
                </label>
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required
                    className="focus:ring-green-500 focus:border-green-500"
                />
                {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
            </div>
        </>
    )
}

export default InputField
