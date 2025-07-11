// import fs from 'fs/promises';

// export type WorldWeekdays = 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';

// export interface WorldDate {
//     year: number;
//     month: number;
//     day: number;
//     hour: number;
//     minute: number;
//     weekday: WorldWeekdays
// }

// export interface WorldWeather {
//     temperature: number; // in Celsius
//     humidity: number; // percentage
//     condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy'; // weather condition
// }

// export type PersonID = string; // Unique identifier for residents

// export interface WorldJob {
//   title: string;
//   location: WorldBuildingID; // ID of the building where the job is located
// }

// export interface Person {
//     id: PersonID;
//     name: string;
//     age: number;
//     dateOfBirth: WorldDate;
//     job: WorldJob | null; // Job details if employed, null if unemployed
//     current: {
//       residence: {
//         city: WorldCityID; // Current city of residence
//         building: WorldBuildingID; // Current building ID
//       }
//       location: {
//         coordinates: {
//           x: number; // X coordinate in the city
//           y: number; // Y coordinate in the city
//         };
//         city: WorldCityID; // Current city ID
//         building: WorldBuildingID | null; // Current building ID, null if not in a
//       }
//       phsyical: {
//         mood: 'happy' | 'neutral' | 'sad'; // Current mood of the person
//         status: 'healthy' | 'sick' | 'injured'; // Health status
//         lastCheckup: WorldDate; // Last health checkup date
//       }
//     }
// }

// export type WorldBuildingType = 
//   'town-hall' | 
//   'hospital' | 
//   'police-station' | 
//   'fire-station' | 
//   'post-office' |
//   'school' | 
//   'library' | 
//   'bank' |
//   'accommodation' |
//   'commercial' |
//   'residential' |
//   'hospitality';

// export type OperatingSchedule = {
//   days: 'weekdays' | 'weekends' | 'all';
//   hours: 'day-time' | 'night-time' | '24-hours';
// }

// export type WorldBuildingID = string; // Unique identifier for buildings

// export interface WorldBuilding {
//     id: WorldBuildingID;
//     name: string;
//     type: WorldBuildingType;
//     location: WorldCityID;
//     operatingHours: OperatingSchedule;
//     employees: PersonID[]; // People working in this building
//     capacity: number; // Maximum number of people the building can accommodate
//     localInfo: { // Info only available to people in the building
//       peoplePresent: PersonID[]; // People currently in the building
//     }
// }

// export type WorldCityID = string; // Unique identifier for cities

// export interface WorldCity {
//     id: WorldCityID;
//     name: string;
//     residents: PersonID[];
//     visitors: PersonID[];
//     buildings: WorldBuilding[];
// }

// export interface WorldState {
//     lastUpdated: Date;
//     date: WorldDate;
//     worldWeather: WorldWeather; // Optional weather state
//     cities: Record<WorldCityID, WorldCity>; // Cities in the world, indexed by ID
//     people: Record<PersonID, Person>; // People in the world, indexed by ID
// };


// const defaultWorldState: Omit<WorldState, "lastUpdated"> = {
//     date: {
//         year: 2025,
//         month: 1, // January
//         day: 1, // 1st day of the month
//         hour: 0, // first hour of the day
//         minute: 0, // 0 minutes
//         weekday: 'Wednesday'
//     },
//     worldWeather: {
//         temperature: 20, // Default temperature in Celsius
//         humidity: 50, // Default humidity percentage
//         condition: 'sunny' // Default weather condition
//     },
//     cities: {}, // No cities initially
//     people: {} // No people initially
// };

// export async function createNewWorld(initialWorldState?: Partial<WorldState>): Promise<WorldState> {
//     // Initialize the world state
//     const world: WorldState = {
//         ...defaultWorldState,
//         ...initialWorldState,
//         lastUpdated: new Date()
//     }

//     console.log('World created with initial state:', world);

//     return world;
// }

// export async function updateWorld(worldStateProps: Partial<WorldState>): Promise<WorldState> {
//     let oldWorld = await loadWorldState();

//     if (!oldWorld) {
//       return await createNewWorld(worldStateProps)
//     }

//     const newWorld: WorldState = {
//         ...oldWorld,
//         ...worldStateProps,
//         lastUpdated: new Date() // Update the last updated timestamp
//     };
//     await saveWorldState(newWorld)
//     console.log('World updated:', newWorld);
//     return newWorld
// }

// const FILE_PATH = './worldstate.json';

// export async function saveWorldState(world: WorldState) {
//   await fs.writeFile(FILE_PATH, JSON.stringify(world, null, 2), 'utf-8');
// }

// export async function loadWorldState(): Promise<WorldState | null> {
//   try {
//     const data = await fs.readFile(FILE_PATH, 'utf-8');
//     return JSON.parse(data) as WorldState;
//   } catch {
//     return null;
//   }
// }

// export async function loadOrCreateWorld(initialWorldState?: Partial<WorldState>): Promise<WorldState> {
//   let world = await loadWorldState();

//   if (!world) { 
//     console.log('No existing world state found, creating a new world...');
//     world = await createNewWorld(initialWorldState);
//     await saveWorldState(world)
//   }

//   return world;
// }

