/** ################################################################################################################################################################################################# */
/** 1. TypeScript Mapped Types as clauses */

type State = {
  name: string;
  age: number;
};

// TODO with MyCapitalize
type Getters<TObj> = {};
type Setters<TObj> = {};

type Store<State> = Setters<State> & Getters<State>;

const person: Store<State> = {};

/** ################################################################################################################################################################################################# */
// 2. Remove object prefix

type ApiData = {
  "maps:log": string;
  "maps:lat": string;
};


type RemovePrefixFromObject<TObj> = {};
// now this will be type {log: string, lat: string}
const removedMap: RemovePrefixFromObject<ApiData> = {};
/** ################################################################################################################################################################################################# */
/** 3. What does KEYOF mean in TypeScript */
type PersonKeyofExample = {
  name: string;
  age: number;
};

const personKeyofExample = {
  name: "John",
  age: 24,
};

const getData = (data, key) => {
  return data[key];
};
const getDataType = getData(personKeyofExample, "age");

/** 4. Get deepValue of object */

const DeepReturnExample = {
  foo: {
    a: true,
    b: 2,
  },
  bar: {
    c: "cool",
    d: 2,
  },
};

const getDeepValue = <TObj, TKey, TKey1>(
  data: TObj,
  key1: TKey,
  key2: TKey1
) => {
  return data[key1][key2];
};
// Should return only type of c and pass only c | d as param
const itemExample = getDeepValue(DeepReturnExample, "bar", "d");

/** ################################################################################################################################################################################################# */
/** 5. Extract values of specific key */
type ExtractExample = {
  a: string;
  a1: number;
  b: boolean;
};

type ObjectOfKeysStartingWith = {};
type ValuesOfKeysStartingWith = {};

// {a: string, a1: number}
type NewExtractedType = ObjectOfKeysStartingWith<ExtractExample, "a", "a">;

// string | number
type NewExtractedUnion = ValuesOfKeysStartingWith<ExtractExample, "a", "a1">;

/** ################################################################################################################################################################################################# */
/** 6. Remove keys from object */

const makeKeyRemover = (keys: []) => (obj) => {
  return {};
};

const keyRemover = makeKeyRemover(["a", "b"]);

const keyRemoveObject = keyRemover({ a: 1, b: 2, c: 3 });
// Now you only have keyRemoveObject.c
keyRemoveObject.c;
/** ################################################################################################################################################################################################# */

/** 7. Deep partial of the object */

type DeepPartialExample = {
  a: string;
  b: {
    c: {
      d: string;
    };
    e: string;
    f: { name: string }[];
  };
};

type DeepPartial<TObj> = {};

const x: DeepPartial<DeepPartialExample> = {
  b: {
    c: {},
    f: [],
  },
};

/** ################################################################################################################################################################################################# */

/** 8. TypeScript MAPPED Types */
type Point = {
  readonly x: number;
  y?: number;
};

type MappedCustomReadonlyOptional = {};
type MappedCustomOmitReadonlyOptional = {};
type MappedCustomOmitOptional = {};
// Implementation of mapped type

type Result1 = MappedCustomReadonlyOptional<Point>;
type Result2 = MappedCustomOmitReadonlyOptional<Point>;
type Result3 = MappedCustomOmitOptional<Point>;

/** ################################################################################################################################################################################################# */

/** 9. DeepReadonly */
type DeepReadonly = {};
const exampleDeepReadonly: DeepReadonly<{ a: { b: number } }> = {
  a: { b: 123 },
};
// This will throw error now NOTE: Readonly util goes only one level deep
exampleDeepReadonly.a.b = 213;

/** ################################################################################################################################################################################################# */
/** 10. is in typescript */

type Square = {
  type: "square";
  size: number;
};

type Rectangle = {
  type: "rectangle";
  height: number;
  width: number;
};

type Shape = Square | Rectangle;

const shape: Shape[] = [
  { type: "square", size: 2 },
  { type: "rectangle", height: 2, width: 2 },
];

const isSquare = () => true;
const isRectangle = () => true;
// It will cast to proper type
const square = shape.find(isSquare);
const size = square?.size;
const rectangle = shape.find(isRectangle);
const width = rectangle?.height;

/** ################################################################################################################################################################################################# */

/** ################################################################################################################################################################################################# */
/** 11. Force function to get proper parameters */

// This will throw error
// setupAccount(accBalance, accNumber);

/** Dynamic function arguments with GENERICS */
type CustomEvent =
  | {
      type: "LOG_IN";
      payload: {
        userId: string;
      };
    }
  | {
      type: "SIGN_OUT";
    };

const sendEvent = () => {};
/** Correct */
sendEvent("SIGN_OUT");
sendEvent("LOG_IN", { userId: "123" });

/** Incorrect */
sendEvent("SIGN_OUT", {});
sendEvent("LOG_IN", { userId: 123 });
sendEvent("LOG_IN");

/** ################################################################################################################################################################################################# */
/** 12. Preserving AutoComplete for Literal Unions */

// solution one
type Padding = "md" | "lg" | (string & {});
// solution two
type LooseAutocomplete = any;

// Now we will have auto complete
const padding: Padding = "";
const padding2: Padding = "8px";
const padding3: LooseAutocomplete = "lg";
const padding4: LooseAutocomplete = "8px";

/** ################################################################################################################################################################################################# */

/** ################################################################################################################################################################################################# */
/** 13. Derive a union type from an object */
const fruitsCount = {
  apple: 1,
  banana: 6,
};

type FruitsCount = typeof fruitsCount;

type NewNestedFruitCount = {};

const nestedFruitCount: NewNestedFruitCount<FruitsCount> = {
  apple: {
    apple: 1,
    banana: 6,
  },
  banana: {
    apple: 1,
    banana: 6,
  },
};

/** This will omit keys and bring back to initial */
type NewXNestedFruitCount<TObj> = {};

const nestedXFruitCount: NewXNestedFruitCount<FruitsCount> = {
  apple: 1,
  banana: 6,
};

type NewSingleFruitCount<TObj> = {};

type y = keyof FruitsCount;
type x = NewSingleFruitCount<FruitsCount>;

const singleFruitCount: NewSingleFruitCount<FruitsCount> = {
  banana: 2,
};

/** ################################################################################################################################################################################################# */

/** 14. Use 'in' operator to transform a union to another union */
type Entity =
  | {
      type: "user";
    }
  | {
      type: "admin";
    }
  | {
      type: "superAdmin";
    };

// Goal is to add id to this elements like userId, adminId, superAdminId
type EntityWithId = {};

const entityWithId: EntityWithId = {
  type: "user",
  userId: "123",
};

/** ################################################################################################################################################################################################# */

import type { Equal, Expect } from "./index.d";
 

type BEM<B extends string, E extends string[], M extends string[]> = any;

/* _____________ Test Cases _____________ */

type cases = [
  Expect<Equal<BEM<'btn', ['price'], []>, 'btn__price'>>,
  Expect<Equal<BEM<'btn', ['price'], ['warning', 'success']>, 'btn__price--warning' | 'btn__price--success' >>,
  Expect<Equal<BEM<'btn', [], ['small', 'medium', 'large']>, 'btn--small' | 'btn--medium' | 'btn--large' >>,
]


/* _____________ Your Code Here _____________ */

type CompareArrayLength<T extends any[], U extends any[]> = T['length'] extends U['length'] ? 0 : U['length'] extends T[number] ? 1 : -1;

/* _____________ Test Cases _____________ */

type cases1 = [
  Expect<Equal<CompareArrayLength<[1, 2, 3, 4], ["2", "6"]>, 1>>,
  Expect<Equal<CompareArrayLength<[1, 2], [3, 4, 5, 6]>, -1>>,
  Expect<Equal<CompareArrayLength<[], []>, 0>>,
  Expect<Equal<CompareArrayLength<[1, 2, 3], [4, 5, 6]>, 0>>,
]

/*** Exercises  */

/* Exercises 1

Intro:

    Filtering requirements have grown. We need to be
    able to filter any kind of Persons.

Exercise:

    Fix typing for the filterPersons so that it can filter users
    and return User[] when personType='user' and return Admin[]
    when personType='admin'. Also filterPersons should accept
    partial User/Admin type according to the personType.
    `criteria` argument should behave according to the
    `personType` argument value. `type` field is not allowed in
    the `criteria` field.

Higher difficulty bonus exercise:

    Implement a function `getObjectKeys()` which returns more
    convenient result for any argument given, so that you don't
    need to cast it.

    let criteriaKeys = Object.keys(criteria) as (keyof User)[];
    -->
    let criteriaKeys = getObjectKeys(criteria);

*/

interface User {
  type: "user";
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: "admin";
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  {
    type: "user",
    name: "Max Mustermann",
    age: 25,
    occupation: "Chimney sweep",
  },
  { type: "admin", name: "Jane Doe", age: 32, role: "Administrator" },
  { type: "user", name: "Kate Müller", age: 23, occupation: "Astronaut" },
  { type: "admin", name: "Bruce Willis", age: 64, role: "World saver" },
  { type: "user", name: "Wilson", age: 23, occupation: "Ball" },
  { type: "admin", name: "Agent Smith", age: 23, role: "Anti-virus engineer" },
];

export function logPerson(person: Person) {
  console.log(
    ` - ${person.name}, ${person.age}, ${
      person.type === "admin" ? person.role : person.occupation
    }`
  );
}

export function getObjectKeys(criteria) {}

export function filterPersons(
  persons: Person[],
  personType: User["type"],
  criteria: any
): User[];
export function filterPersons(
  persons: Person[],
  personType: Admin["type"],
  criteria: any
): Admin[];
export function filterPersons(
  persons: Person[],
  personType: string,
  criteria: any
): Person[] {
  return persons
    .filter((person) => person.type === personType)
    .filter((person) => {
      let criteriaKeys = getObjectKeys(criteria);
      return criteriaKeys.every((fieldName) => {
        return person[fieldName] === criteria[fieldName];
      });
    });
}

export const usersOfAge23 = filterPersons(persons, "user", { age: 23 });
export const adminsOfAge23 = filterPersons(persons, "admin", { age: 23 });

console.log("Users of age 23:");
usersOfAge23.forEach(logPerson);

console.log();

console.log("Admins of age 23:");
adminsOfAge23.forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads
