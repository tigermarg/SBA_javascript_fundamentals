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

// If an AssignmentGroup does not belong to its course (mismatching course_id), your program should throw an error, letting the user know that the input was invalid. Similar data validation should occur elsewhere within the program.

// You should also account for potential errors in the data that your program receives. What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting to be a number is instead a string? 
    // Use try/catch and other logic to handle these types of errors gracefully.

// If an assignment is not yet due, do not include it in the results or the average. Additionally, if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total points possible from their score for that assignment.

// Create a function named getLearnerData() that accepts these values as parameters, in the order listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, which should be an array of objects as described above.

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

// ---------------------------------------------------------------------------------

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
  

//Function------------------------------------------------------------------

//   function getLearnerData(course, ag, submissions) {
//     let result = [];
//     //collect data from LearnerSubmissions then compare (math on how to use it)

//     LearnerSubmissions.forEach((el => {

//         } 
//     ))
  
//     return result;
//   }



//Checks -------------------------------------------------------------------  
    try{
        if(points_possible == 0){
            console.log(`Error`)
        } else {
            throw `Valid`;
        }
    } catch (error) {
        console.log(error)
    }
    
    try{
        if(value !== number){
            console.log(`Error`)
        } else {
            thorw `Valid`;
        }
    } catch(error){
        console.log(error)
    }

    try{
        if(CourseInfo.id == AssignmentGroup.course_id) {
            console.log(`Valid`)
        } else {
            throw `Error: Input is invalid.`;
        }
    } catch (error) {
        console.log(error)
    }

console.log(`does this log?`)
  

//Function call----------------------------------------------------------------
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
  console.log(result);



//Result ------------------------------------------------------------------------
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
  
