import openSocket from 'socket.io-client';
const port = 8000;
const socket = openSocket(`http://localhost:${port}`);

function subscribeToStudentListChange(){
    socket.emit('subscribeToStudentListChange');
}

function refreshStudentListState(callback){
    socket.on('student', student => callback(student));
}

function unsubscribeFromEvents(){
    socket.removeAllListeners();
}

function saveStudent({ student }){
    socket.emit('saveStudent', { student });
}

function removeStudent(student){
    socket.emit('removeStudent', student);
}

function subscribeToAdminLogin(callback){
    socket.on('admin', () => callback(true));
    socket.on('notAdmin', () => callback(false));
}

function adminLogin(admin){
    socket.emit('adminLogin', admin);
}

function saveStudentList(studentList, date){
    socket.emit('saveStudentList', { studentList, date });
}

function clearStudentList(){
    socket.emit('clearStudentList');
}

function loadHistoryList(from, to){
    socket.emit('loadHistoryList', { from, to });
}

function refreshHistoryListState(callback){
    socket.on('historyList', history => callback(history));
}

function searchHistory(date){
    socket.emit('searchHistory', date);
}

function historySearchResult(callback){
    socket.on('historySearchResult', searchResult => callback(searchResult));
}

function showLoadingAnimation(callback){
    socket.on('showLoadingAnimation', (status) => callback(status));
}

function noMoreResults(callback){
    socket.on('noMoreResults', status => callback(status))
}

function newFbLogin(response){
    socket.emit('newFbLogin', response);
}

function listenForFbLogin(callback){
    socket.on('newFbLogin', (response) => callback(response));
}

export {
    subscribeToStudentListChange,
    refreshStudentListState,
    unsubscribeFromEvents,
    saveStudent,
    removeStudent,
    subscribeToAdminLogin,
    adminLogin,
    saveStudentList,
    clearStudentList,
    loadHistoryList,
    refreshHistoryListState,
    searchHistory,
    historySearchResult,
    showLoadingAnimation,
    noMoreResults,
    newFbLogin,
    listenForFbLogin,
}