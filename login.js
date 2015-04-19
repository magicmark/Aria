var Notes = {
  'a': 440,
  'd': 587,
  'e': 659,
  'f': 698

};

var hascompleted = false;

var LoginManager = function (_notes) {
  this.isLoggedIn = false;
  this.percentageDone;
  this.stages = _notes.length;
  this.loginBarFraction = 1/_notes.length;
  this.notes = _notes;

  // The index of the note in the notes array the user needs to sing next
  this.nextNote = 0;

  this.fudgeFactor = 13;

  initProgressBar();

};

var initProgressBar = function () {
  NProgress.configure({ parent: '#barcontainer' });
  NProgress.configure({ showSpinner: false });
  NProgress.configure({ trickle: false });
  NProgress.configure({ minimum: 0.0 });

  NProgress.start();
  NProgress.set(0);
};

LoginManager.prototype.updatePercentage = function(percentageDone) {
  this.percentageDone = percentageDone;
};

LoginManager.prototype.didSingNextNote = function (freq) {
  var nextLetterNote = this.notes[this.nextNote];
  var targetFrequency = Notes[nextLetterNote];
  var upperBound = targetFrequency + 10;
  var lowerBound = targetFrequency - 10;

  if (!nextLetterNote) {
    return false;
  }

  if ((upperBound >= freq) && (lowerBound <= freq)) {
    return nextLetterNote;
  } else {
    return false;
  }

};

LoginManager.prototype.sungNextNote = function (theNote) {
  var me = this;

  this.nextNote++;
  NProgress.set((this.nextNote) * this.loginBarFraction);
  console.log("Note: '" + theNote + "' sung!");
  $("#note").text(theNote.toUpperCase());
  $("#note").fadeIn().fadeOut(400, function () {
    if (me.nextNote == me.notes.length ) {
      me.completed();
    }
  });
};


LoginManager.prototype.sing = function(freq) {
  console.log('Frequency indicator: ' , freq);
  
  var noteSung = this.didSingNextNote(freq);

  if (noteSung) {
    this.sungNextNote(noteSung);
  }


};

LoginManager.prototype.completed = function () {
  if (!hascompleted) {
    $("#balance").fadeIn();
    $("#barcontainer").fadeOut();
    console.log('TODO: A more fancy log in message');
    alert('Horray! You managed to log in! You don\'t have any monies. :(');
    hascompleted = true;
  }
};
