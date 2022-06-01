import Countdown from "react-countdown";

let CountdownPrimary: any = Countdown;
type ICountdownCollectionProps = {
  saleDateTime: Date;
};

const CountdownCollection = ({ saleDateTime }: ICountdownCollectionProps) => {
  return (
    <CountdownPrimary
      date={saleDateTime}
      renderer={({ days, hours, minutes, seconds, completed }: any) => {
        if (completed)
          return <div className="text-3xl">Sale Live &nbsp;🎉 </div>;
        else
          return (
            <div className="flex gap-3 sm:gap-8 items-center text-xl sm:text:2xl">
              <div className="flex flex-col items-center gap-0 sm:gap-2">
                <div className="day-countdown">{days}</div>
                <div className="label-countdown">days</div>
              </div>
              :
              <div className="flex flex-col items-center gap-0 sm:gap-2">
                <div className="day-countdown">{hours}</div>
                <div className="label-countdown">hours</div>
              </div>
              :
              <div className="flex flex-col items-center gap-0 sm:gap-2">
                <div className="day-countdown">{minutes}</div>
                <div className="label-countdown">minutes</div>
              </div>
              :
              <div className="flex flex-col items-center gap-0 sm:gap-2">
                <div className="day-countdown">{seconds}</div>
                <div className="label-countdown">seconds</div>
              </div>
            </div>
          );
      }}
    />
  );
};

export default CountdownCollection;
