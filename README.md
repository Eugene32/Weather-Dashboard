# Weather-Dashboard


This web page is similar to a day planner where:
 - The day is divided by hour from 9AM to 5PM.
 - Entry can be saved per hour division.
 - Event entry can be saved locally and be retrieved if there was a previous entry.
    - Unsaved entry will be lost upon refresh.
 - Background color will change depending on the system time.
    - Past hours will be in gray.
    - Current time on the planner will be in red.
    - The rest of the time will be in green denoting that it is still in the future.
 - This page utilizes third-party APIs like Bootstrap, JQuery and momentjs.
 - Limitations:
    - This web page does not take into consideration the change in date.
        - Entries will still be the same thing that will be reflected on all days.
    - Range of the day planner is static.


Web page link --> [Day Planner](https://eugene32.github.io/Day_Planner/)

Web page preview:

![alt text][logo]

[logo]: assets/05-third-party-apis-homework-demo.gif "Day Planner"