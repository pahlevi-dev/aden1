import { IStepProcess } from '@/interface/query/services/process';

interface IProps {
  data: IStepProcess[];
}

export const StepProcess = ({ data }: IProps) => {
  return (
    <div className="mt-5">
      {data.map((item, i) => (
        <div
          key={i}
          className="process pl-5 pb-7 relative border-l-2 border-secondary"
        >
          <div className="absolute bg-secondary w-5 aspect-square rounded-full left-0 top-0 -translate-x-[60%]"></div>
          <h3 className="text-2xl font-semibold mb-3">Step {i + 1}</h3>
          <p className="max-w-[500px]">{item.name}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: item.description?.html ?? '',
            }}
          />
        </div>
      ))}
    </div>
  );
};
