export interface Launch {
    customers: string[];
    target: string;
    flightNumber: number;
    launchDate: Date;
    mission: string;
    rocket: string;
    success: boolean;
    upcoming: boolean;
}
