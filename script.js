// Your goal is to analyze and transform this data such that the output of your program is an array of objects, each containing the following information in the following format:
// {
//     // the ID of the learner for which this data has been collected
//     "id": number,
//     // the learner’s total, weighted average, in which assignments
//     // with more points_possible should be counted for more
//     // e.g. a learner with 50/100 on one assignment and 190/200 on another
//     // would have a weighted average score of 240/300 = 80%.
//     "avg": number,
//     // each assignment should have a key with its ID,
//     // and the value associated with it should be the percentage that
//     // the learner scored on the assignment (submission.score / points_possible)
//     <assignment_id>: number,
//     {/* if an assignment is not yet due, it should not be included in either
//     the average or the keyed dictionary of scores  */}
// }

//What do we know?
    //4 types of data:
        // CourseInfo object
        // AssignmentGroup object
            // AssignmentInfo object within assignments array
        // array of `learnersubmission` objects
    //1 course
        //id: 451
    //1 AssignmentGroup
        //id: 12345
        //3 assignments
            //id: 1, 2, 3
    //2 learners
        //learner_ID: 125
        //learner_ID: 132

// --------------------------------------------------------------------------------------------

// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",  
    course_id: 451, // the ID of the course the assignment group belongs to
    group_weight: 25,   // the percentage weight of the entire assignment group
    assignments: [ //Provided assignment info.
      {
        id: 1,
        name: "Declare a Variable", 
        due_at: "2023-01-25",   // the due date for the assignment
        points_possible: 50     // the maximum points possible for the assignment
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };  
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];


// If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.
// You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string? 
  // Use try/catch and other logic to handle these types of errors gracefully.

//Error check: mismatching course_id-------------------------------------------------------------------

    try{
        if(CourseInfo.id == AssignmentGroup.course_id) {  //check for matching course ID using try/catch
            console.log(`Valid`) //Output: Valid
        } else {
            throw `Error: Input is invalid.`; //if not valid, throws error message
        }
    } catch (error) { //if output results in error
        console.log(error)
    }

//Error check: points_possible is 0---------------------------------------------------------------------

AssignmentGroup.assignments.forEach(function(points) { //Looping through object using .forEach
    try{  //Using try/catch to find errors
        if(points.points_possible === 0){ //if points_possible is equal to 0
            console.log(`Not a valid entry`) //input error
        } else {
            throw `Valid`; //throws valid output for all 3 assignments
        } 
    } catch (error) { //if output results in error
        console.log(error)
    } 
  })  
  
//Error check: Value is not a number, instead a string (NaN)--------------------------------------------

function isNumber(value){ //function: if value is a number, typeof value returns a `number` (true) //boolean
  return typeof value === `number`;
}

console.log(isNumber(10)) //Output: true
console.log(isNumber(`string`)) //Output: false  


// If an assignment is not yet due, do not include it in the results or the average. Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.

// Create a function named getLearnerData() that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an array of objects as described above.

// ---------------------------------------------------------------------------------------------------

//Could not get application to work within a single function //Error check sections above must be commented out to get results below

//Helper functions-------------------------------------------------------------------------------------

function totalPoints() { //total points possible for assignments 1 & 2 (50 + 150)
  return AssignmentGroup.assignments[0].points_possible + AssignmentGroup.assignments[1].points_possible
   }
   console.log(totalPoints()) // 200
 
 
 function learner1() { //learner 1 total points for assignments 1 & 2 (47 + 150)
   return LearnerSubmissions[0].submission.score + LearnerSubmissions[1].submission.score
   }
   console.log(learner1()) // 197
 
 
 function learner2() { //learner 2 total points for assignments 1 & 2 (39 + 125)
   return LearnerSubmissions[3].submission.score + (LearnerSubmissions[4].submission.score - (.1 * LearnerSubmissions[4].submission.score))
   }
   console.log(learner2())  // 165
 
 
 const average1 = learner1() / totalPoints() //learner 1 average = total points / total points possible
   console.log(`avg`, average1) // variable `average1` = 0.985
 
 const average2 = learner2() / totalPoints() //learner 2 avearge = total points / total points possible 
   console.log(`avg`, average2) // variable `average2` = 0.895 
 

//Function----------------------------------------------------------------------------------------------
  //Unsuccessful with this function template:
        // function getLearnerData(course, ag, data) {
        // //     {
        // //   return main;
        // // }
        // }

  //Allocate memory for new arrays
    let result1 = [];  
    let result2 = []

  for(let e of LearnerSubmissions){ //Looped through object to get learner ids
    result1.push({id: e.learner_id})  //Added id1 to result1 array
    result2.push({id: e.learner_id})  //Added id2 to result2 array
  } 
    result1.splice(1, 4)  //Removed extra ids for learner1
    result2.splice(0, 4)  //Removed extra ids for learner2

    result1.push({avg: average1}) //Added learner1 weighted average to array
    result2.push({avg: average2}) //Added learner2 weighted average to array

let todaysDate = `2024-09-18` //Created variable with manual date for loop below -- could not get newDate() to work

for (let i of LearnerSubmissions) {   //Looping through object
  for (let j of AssignmentGroup.assignments) {    //Looping through array of objects
    if (j.id == i.assignment_id && i.submission.submitted_at <= j.due_at && j.due_at <= todaysDate) {   //Matching assignment ids and submission date is <= due date and due date is <= today's date 
    let percent = (i.submission.score / j.points_possible)  //Percentage score of all assignments meeting the conditions
    result1.push({grade: percent}) //Percentage scores for valid assignments //Couldn't figure out how to assign assignment id for each grade //Pushed results to result1 array
  
  } 
    else if (j.id == i.assignment_id && j.due_at < todaysDate) { //Matching assignment ids and if past due date
    let newPercent = (i.submission.score / j.points_possible) - .1 //Deduct 10% from score 
    result2.push({grade: newPercent}) //New percentage score of late submission // Pushed results to result2 array
   }continue;
  } 
}
 const removed = result1.splice(4,4)  //Removed last object and stored to variable `removed` 

  result2.splice(2,0,removed) //Added `removed` object from result1 and placed in appropriate position in result2 

  //Ended up with incorrect formatting -- two array of objects (separated) & the `removed` object ended up in its own array //Had a challenge looping through the data to create two objects within an array //Couldn't figure out how to nest the calculations for the averages in the loop 

  //Final result:

  console.log(result1)   

  // [ { id: 125 }, { avg: 0.985 }, { grade: 0.94 }, { grade: 1 } ]

  console.log(result2)  

  //[
  //   { id: 132 },
  //   { avg: 0.825 },
  //   [ { grade: 0.78 } ],
  //   { grade: 0.8333333333333334 }
  // ]


//Function call-------------------------------------------------------------------------------------
//Unsuccessful with the function call  

  // const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
    // console.log(result);

//Result -------------------------------------------------------------------------------------------
//   const result = [
//     {
//       id: 125,
//       avg: 0.985, // (47 + 150) / (50 + 150)
//       1: 0.94, // 47 / 50
//       2: 1.0 // 150 / 150
//     },
//     {
//       id: 132,
//       avg: 0.82, // (39 + 125) / (50 + 150)
//       1: 0.78, // 39 / 50
//       2: 0.833 // late: (140 - 15) / 150
//     }
//   ];
  
