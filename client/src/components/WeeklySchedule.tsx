import { BatteryCharging, Clock } from "lucide-react";

type ScheduleItem = {
  type: string;
  duration?: string;
  isRest?: boolean;
  color: "primary" | "secondary" | "gray";
};

type DaySchedule = {
  name: string;
  activities: ScheduleItem[];
};

export default function WeeklySchedule() {
  const schedule: DaySchedule[] = [
    {
      name: "Monday",
      activities: [
        { type: "Upper Body", duration: "45 min", color: "primary" },
        { type: "Rest", isRest: true, color: "gray" }
      ]
    },
    {
      name: "Tuesday",
      activities: [
        { type: "Cardio", duration: "30 min", color: "secondary" }
      ]
    },
    {
      name: "Wednesday",
      activities: [
        { type: "Lower Body", duration: "45 min", color: "primary" }
      ]
    },
    {
      name: "Thursday",
      activities: [
        { type: "Rest", isRest: true, color: "gray" }
      ]
    },
    {
      name: "Friday",
      activities: [
        { type: "Upper Body", duration: "45 min", color: "primary" }
      ]
    },
    {
      name: "Saturday",
      activities: [
        { type: "HIIT", duration: "25 min", color: "secondary" }
      ]
    },
    {
      name: "Sunday",
      activities: [
        { type: "Rest", isRest: true, color: "gray" }
      ]
    }
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Weekly Schedule</h2>
          <p className="text-gray-600 dark:text-gray-400">Your personalized training calendar</p>
        </div>
        
        <div className="overflow-x-auto pb-4">
          <div className="grid grid-cols-7 gap-3 min-w-[700px]">
            {schedule.map((day, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-center font-medium rounded-t-lg">
                  {day.name}
                </div>
                <div className="p-4">
                  {day.activities.map((activity, actIndex) => (
                    <div 
                      key={actIndex}
                      className={`${
                        activity.color === 'primary' 
                          ? 'bg-primary/10 dark:bg-primary/20' 
                          : activity.color === 'secondary'
                          ? 'bg-blue-500/10 dark:bg-blue-500/20'
                          : 'bg-gray-100 dark:bg-gray-800'
                      } p-3 rounded-lg ${actIndex < day.activities.length - 1 ? 'mb-3' : ''}`}
                    >
                      <p className="font-medium text-sm mb-1">{activity.type}</p>
                      <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                        {activity.isRest ? (
                          <>
                            <BatteryCharging className="w-3 h-3 mr-1" />
                            <span>Recovery</span>
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{activity.duration}</span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
