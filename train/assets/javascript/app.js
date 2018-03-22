var config = {
  apiKey: "AIzaSyCRcU8_4J8jNaR8rjBXo0NkyPfG-BjD5OU",
  authDomain: "myfirebase-d1169.firebaseapp.com",
  databaseURL: "https://myfirebase-d1169.firebaseio.com",
  projectId: "myfirebase-d1169",
  storageBucket: "myfirebase-d1169.appspot.com",
  messagingSenderId: "535681545205"

};

firebase.initializeApp(config);

var database = firebase.database();
  
    $("#sub").on("click", function(){
      event.preventDefault();
  
     
      var trainName = $("#trainNameInput").val().trim();
      var destination = $("#destinationInput").val().trim();
      var firstTrain = moment($("#trainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
      var frequency = $("#frequencyInput").val().trim();
  
      var trainInfo = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      };
  
      database.ref().push(trainInfo);
  
      console.log(trainInfo.name);
      console.log(trainInfo.destination); 
      console.log(firstTrain);
      console.log(trainInfo.frequency)
      
      alert("New train successfully added");
  
      $("#trainNameInput").val("");
      $("#destinationInput").val("");
      $("#trainInput").val("");
      $("#frequencyInput").val("");
  
    
  
      return false;
    });
  
  
    
    database.ref(). on("child_added", function(childSnapshot, prevChildKey){
  
      console.log(childSnapshot.val());
  
      var tName = childSnapshot.val().name;
      var tDestination = childSnapshot.val().destination;
      var tFrequency = childSnapshot.val().frequency;
      var tFirstTrain = childSnapshot.val().firstTrain;
  
      
      var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
      var remainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
      var minutes = tFrequency - remainder;
  
      var arrival = moment().add(minutes, "m").format("hh:mm A"); 
      console.log(minutes);
      console.log(arrival);
  
      console.log(moment().format("hh:mm A"));
      console.log(arrival);
      console.log(moment().format("X"));
  
      $("#trainSchedule > tbody").append("<tr><td>" + tName + "</td><td>" + tDestinatination + "</td><td>" + tFrequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
  
    });