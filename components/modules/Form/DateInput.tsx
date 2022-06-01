import Label from "./Label";

interface Props {
  name: string;
  label: string;
  placeholder?: string;

  register: any;
  error?: string;
}

const DateInput = ({ name, label, placeholder, register, error }: Props) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between">
        <Label id={name}>{label}</Label>
      </div>
      <div className="relative">
        <input
          rows={6}
          name={name}
          id={name}
          {...register(name)}
          type="datetime-local"
          placeholder={placeholder}
          className="bg-background border border-purple-400 border-opacity-20 rounded-[5px] w-full p-3 text-lg focus:border-transparent focus:ring-primaryLight focus:ring-2 focus:bg-black"
        />
      </div>
      {error && <div className="text-red-400 mt-1">{error}</div>}
    </div>
  );
};

export default DateInput;
