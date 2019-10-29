$(document).ready(function(){
    "use strict";
    
    var questions = [{
      
      question: "<img src=\"Assignment4_pics/A.png\"  / width=140px height=140px align=centre> what is this Hiragana character?",
      choices: [ '"A"', '"KA"', '"TI"', '"SU"'],
      Answer: 0
    },
     {
        question: "<img src=\"Assignment4_pics/HI.png\"  / width=140px height=140px align=centre> what is this Hiragana character?",
        choices: [ '"SE"', '"A"', '"HI"', '"SO"'],
        Answer: 2
    }, 
    {
      question: "<img src=\"Assignment4_pics/SU.png\"  / width=140px height=140px align=centre> what is this Hiragana character?",
      choices: [ '"SE"', '"HI"', '"SO"', '"SU"'],
      Answer: 3
    }, 
    {
      question: "<img src=\"Assignment4_pics/SO.png\"  / width=140px height=140px align=centre> what is this Hiragana character?",
      choices: [ '"A"', '"HI"', '"SO"', '"SU"'],
      Answer: 2
    }, 
    {
      question: "<img src=\"Assignment4_pics/ME.png\"  / width=140px height=140px align=centre> what is this Hiragana character?",
      choices: [ '"SA"', '"HI"', '"MA"', '"ME"'],
      Answer: 4
    }, 
    {
      question: "<img src=\"Assignment4_pics/YU.png\"  / width=140px height=140px align=centre> what is this Hiragana character?",
      choices: [ '"YU"', '"ME"', '"SO"', '"SE"'],
      Answer: 0
    },
     {
      question: "<img src=\"Assignment4_pics/YO.png\"  / width=140px height=140px align=centre> what is this Hiragana character?",
      choices: [ '"U"', '"YO"', '"SU"', '"YU"'],
      Answer: 1
    },
     {
      question: "<img src=\"Assignment4_pics/TO.png\"  / width=140px height=140px align=centre> what is this Hiragana character?",
      choices: [ '"SU"', '"YO"', '"TO"', '"TE"'],
      Answer: 2
    },
     {
      question: "<img src=\"Assignment4_pics/WO.png\"  / width=140px height=140px align=centre> what is this Hiragana character?",
      choices: [ '"TU"', '"WO"', '"YU"', '"WA"'],
      Answer: 1
    },
     {
      question: "<img src=\"Assignment4_pics/SE.png\"  / width=140px height=140px align=centre> what is this Hiragana character?",
      choices: [ '"TA"', '"YU"', '"SA"', '"SE"'],
      Answer: 3
    }
    ];
    
    var count = 0; //Tracks completed questions
    var selections = []; //Array of user selections
    var quiz = $('.content'); //quiz container
    
   
    displayNext();
    
    $('#next').on('click', function (e) {  //onclick() for 'next' button
      e.preventDefault();
      
      if(quiz.is(':animated')) { //avoid prblems during animation       
        return false;
      }
      choose();
      
      //Display warning to make selection if next is pressed with no selection made
      if (isNaN(selections[count])) {
        $('#warning').text('Please make a selection to continue!');
      } else {
        count++;
        displayNext();
        $('#warning').text('');
      }
    });
    

    // display + make the div that contains the questions + choices
    function createQuestionElement(index) {
      var Element = $('<div>', {
        id: 'question'
      });
      
      var header = $('<h2>Question ' + (index + 1) + ':</h2>');
      Element.append(header);
      
      var question = $('<p>').append(questions[index].question);
      Element.append(question);
      
      var radioButtons = createRadios(index);
      Element.append(radioButtons);
      var warningText = $('<p id="warning">');
      Element.append(warningText);
      
      return Element;
  
    }
    
    //radio elements 
    function createRadios(index) {
      var Radios = $('<ul>');
      var item;
      var input = '';
      for (var i = 0; i < questions[index].choices.length; i++) {
        item = $('<li>');
        input = '<input type="radio" name="answer" value=' + i + ' />';
        input += questions[index].choices[i];
        item.append(input);
        Radios.append(item);
      }
      return Radios;
    }
    
    // pushes the user selection to array
    function choose() {
      selections[count] = +$('input[name="answer"]:checked').val();
    }
    
    function displayNext() { //transition from current question --> fade --> next question
      quiz.fadeOut(function() { 
        $('#question').remove();
        
        if(count < questions.length){
          var nextQuestion = createQuestionElement(count);
          quiz.append(nextQuestion).fadeIn();
          if (!(isNaN(selections[count]))) {
            $('input[value='+selections[count]+']').prop('checked', true);
          }
          
         if(count === 0){    
            $('#next').show();
          }
         }else {
          var scoreDisp = displayScore();
          quiz.append(scoreDisp).fadeIn();
          $('#next').hide();
          $('#start').show();
        }
      });
    }
    
    // Computes score and returns a paragraph element to be displayed
    function displayScore() {
      var score = $('<h3>',{id: 'question'});
      var correctNum = 0;
      for (var i = 0; i < selections.length; i++) {
        if (selections[i] === questions[i].Answer) {
          correctNum++;
        }
      }
      // Calculate score and display relevant message
      var percentage = correctNum / questions.length;
      score.append('You got ' + percentage*100 +'% right!');
      /*if (percentage >= 0.9){
          score.append('Congrats! You got ' + correctNum + ' out of ' +
                   questions.length + ' questions right!');
      }
      
      else if (percentage >= 0.7){
          score.append('Good! You got ' + correctNum + ' out of ' +
                   questions.length + ' questions right!');
      }
      
      else if (percentage >= 0.5){
          score.append('You got ' + correctNum + ' out of ' +
                   questions.length + ' questions right.');
      }
      
      else {
          score.append('You only got ' + correctNum + ' out of ' +
                   questions.length + ' right. Want to try again?');
      }*/
      return score;
    }
  });