/*
INSTRUCTIONS:
- See the solution screenshot with the final result.
- USE the helper functions and variables.
- USE the const scores variable provided below.
- When the functions at the bottom are implemented correctly,
the results are rendered in the scores.html.

HINT AND RULES:
- Don't touch the "don't touch" code :)
- Make sure to read the detailed instructions in the slides.
-----------------------------------------------
------------ Touch and DIE --------------------
-----------------------------------------------
*/
const students = [
'MATTHIAS',
'BART',
'THOMAS',
'ALIES',
'LUC',
'TOM',
'KOEN',
'ANN',
];

const subjects = [
'MATH',
'DUTCH',
'MUSIC',
'PROGRAMMING',
];

// !! USE these consts !!
const maximumScore = 20;
const numOfStudents = students.length;
const numOfSubjects = subjects.length;
const scores = generateIntegerMatrix(numOfStudents, numOfSubjects, maximumScore);

document.getElementById('points').appendChild(generateHTMLTable(getPoints()));
document.getElementById('subjectStatistics').appendChild(generateHTMLTable(getSubjectStatistics()));
document.getElementById('studentStatistics').appendChild(generateHTMLTable(getStudentStatistics()));
/*-----------------------------------------------------------------------------
--------------------- Implement functions below -------------------------------
-------------------------------------------------------------------------------
*/
function getPoints() {
	return expandMatrixWithTitles(scores, students, subjects);
}

function getStudentStatistics() {
	const totalsPerStudent = getTotalPerStudent();
	const averagePositionPerStudent = getAveragePositionPerStudent();
	const studentStatistics = [[null, 'Totals', 'Average position(Above or equal/ Below)']];

	for(let i = 0; i < totalsPerStudent.length; i++) {
		const row = [totalsPerStudent[i][0], totalsPerStudent[i][1], averagePositionPerStudent[i][1]];
		studentStatistics.push(row);
	}
	return studentStatistics;
}

function getSubjectStatistics() {
	const highestScorePerSubject = getHighestScorePerSubject();
	const averageScorePerSubject = getAverageScorePerSubject();
	const subjectStatistics = [[null, 'Highest score', 'Average']];

	for(let i = 0; i < highestScorePerSubject.length; i++) {
		const row = [highestScorePerSubject[i][0], highestScorePerSubject[i][1], averageScorePerSubject[i][1]];
		subjectStatistics.push(row);
	}
	return subjectStatistics;
}

function generateIntegerMatrix(numberOfRows, numbersOfCols, maxCellValue) {
	const matrix = [];

	for (let i = 0; i < numberOfRows; i++) {
		const row = [];
		for (let j = 0; j < numbersOfCols; j++) {
			row.push(generateNonZeroNaturalNumber(maxCellValue));
		}
		matrix.push(row);
	}
	return matrix;
}



function getAverageScorePerSubject() {
	const averagesPerSubject = [];

	for (let subjectIndex = 0; subjectIndex < subjects.length; subjectIndex++) {
		averagesPerSubject.push([subjects[subjectIndex], Math.round(getAverageForSubject(subjectIndex))]);
	}
	return averagesPerSubject;
}

function getTotalAverageForClass() {
	let sum = 0;

	for (let i = 0; i < students.length; i++) {
		sum += getTotalForStudent(i);
	}
	return Math.round(sum / students.length);
}

function getAveragePositionPerStudent() {
	const totalPerStudent = getTotalPerStudent();
	const totalAverageForClass = getTotalAverageForClass();

	for (let i = 0; i < totalPerStudent.length; i++) {
		let averagePosition = 'A';
		if (totalPerStudent[i][1] >= totalAverageForClass) {
			averagePosition = 'B';
		}
		totalPerStudent[i][1] = averagePosition;
	}
	return totalPerStudent;
}

function getAverageForSubject(subject) {
	return getAverage(getColumn(subject));
}

function getTotalPerStudent() {
	const totalPerStudent = [];

	for (let studentIndex=0; studentIndex < students.length; studentIndex++) {
		totalPerStudent.push([students[studentIndex], Math.round(getTotalForStudent(studentIndex))]);
	}
	return totalPerStudent;
}

function getTotalForStudent(student) {
	return getAverage(scores[student]);
}

function getHighestScorePerSubject() {
	const highestScoresPerSubject = [];

	for (let subjectIndex = 0; subjectIndex < subjects.length; subjectIndex++) {
		highestScoresPerSubject.push([subjects[subjectIndex], getMaxScore(subjectIndex)]);
	}
	return highestScoresPerSubject;
}

function getMaxScore(subject) {
	return getHighestValue(getColumn(subject));
}

function getColumn(columnIndex) {
	const column = [];

	for (let i = 0; i < scores.length; i++) {
		column.push(scores[i][columnIndex])
	}
	return column
}

function getAverage(arr) {
	return getSum(arr) / arr.length;
}

function getSum(arr) {
	let sum = 0;

	for (let i = 0; i < arr.length; i++) {
		sum += arr[i];
	}
	return sum;
}

function getHighestValue(arr) {
	let highestValue = 0;

	for (let i = 0; i < arr.length; i++) {
		if (highestValue < arr[i]) {
			highestValue = arr[i];
		}
	}
	return highestValue;
}
/*
---------------------------------------------------------
------------ Helper functions and variables -------------
-
- NOT necessary to remove these for statements.
- But try it if you feel challenged.
-
---------------------------------------------------------
*/
function generateHTMLTable(matrix) {
	const table = document.createElement('table');
	const tableBody = document.createElement('tbody');

	table.appendChild(createRow('thead', matrix[0]));
	for (let i = 1; i < matrix.length; i++) {
		tableBody.appendChild(createRow('tr', matrix[i]));
	}
	table.appendChild(tableBody);
	return table;
}

function createRow(type, dataRow) {
	const row = document.createElement(type);

	for (let j = 0; j < dataRow.length; j++) {
		const dataCell = type === 'tr'
			? createDataCell('td', dataRow[j])
			: createDataCell('th', dataRow[j]);
		row.appendChild(dataCell);
	}
	return row;
}

function createDataCell(type, data) {
	const value = data == null || data === undefined ? '' : data;
	const td = document.createElement(type);

	td.appendChild(document.createTextNode(value));
	return td;
}

// Make sure the number of titles equals the number of rows and columns respectively
function expandMatrixWithTitles(matrix, rowTitles, columnTitles) {
	const expandedTable = [];

	for (let i = 0; i < rowTitles.length; i++) {
		expandedTable.push([rowTitles[i], ...matrix[i]]);
	}
	return [[null, ...columnTitles], ...expandedTable]; // add table header
}

function generateNonZeroNaturalNumber(inclusiveLimit) {
	return Math.floor(Math.random() * (inclusiveLimit + 1));
}
