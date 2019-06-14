const STORE = [
    { 
      question: 'Which two teams are in the 2019 NBA Finals?',
      answers: [
        'San Antonio Spurs & Miami Heat',
        'Golden State Warriors & Cleaveland Cavaliers',
        'Milwaukee Bucks & Denver Nuggests',
        'Toronto Raptors & Golden State Warriors'
      ],
      correctAnswer: 'Toronto Raptors & Golden State Warriors',
    },
    
    {
      question: 'How many NBA Championships did Michael Jordan win throughout his career?',
      answers: [
      'Three',
      'Six',
      'Ten',
      'One'
      ],
      correctAnswer: 'Six'
    },
      
    {
      question: 'What is the overall Finals record for Lebron James throughout his career?', 
      answers: [
        '6-0',
        '5-2',
        '3-6',
        '3-3'
      ],
      correctAnswer: '3-6'
    },
  
    {
      question:'Who is the all-time leading scorer in NBA History?',
      answers: [
       'Michael Jordan',
       'Kareem Abdul-Jabbar',
       'Javale Mcgee',
       'Larry Bird' 
      ],
      correctAnswer: 'Kareem Abdul-Jabbar'
    },
  
    {
      question:'How many points did Kobe Bryant score on the Toronto Raptors on January 22, 2006?',
      answers: [
       '10 Points',
       '65 Points',
       '81 Points',
      '100 Points'
      ],
      correctAnswer: '81 Points'
    },
  
   {
      question: 'Which NBA teams won an NBA Championship from 1991-1995 & 1996-1998?',
      answers: [
      'Chicago Bulls',
      'Boston Celtics, LA Lakers, & San Antonio Spurs',
      'Houston Rockets & Detroit Pistons',
      'New York Knicks, LA Lakers, Chicago Bulls, & Houston Rockets'
      ],
      correctAnswer: 'Chicago Bulls'
    },
  
   {
      question: 'In 2011 NBA Draft, which overall pick was Kawhi Leonard selected at?',
      answers: [
       '1st',
       '3rd',
       '8th',
       '15th'
      ],
      correctAnswer: '15th'
    },
  
   {
      question: 'Which player won the 2015 Finals MVP?',
      answers: [
       'Stephen Curry',
       'Draymond Green',
       'Andre Iguodala',
       'Klay Thompson'
      ],
      correctAnswer: 'Andre Iguodala'
    },
  
   {
      question: 'In the 2007 NBA Draft, which player was drafted ahead of Kevin Durant as the 1st overall pick?',
      answers: [
       'Al Horford',
       'Mike Conley',
       'Chris Paul',
       'Greg Oden'
      ],
      correctAnswer: 'Greg Oden'
    },
   
   {
      question: 'Which NBA player is the Greatest of All Time?',
      answers: [
       'Lebron James',
       'Michael Jordan',
       'Kobe Bryant',
       'Bill Russell'
      ],
      correctAnswer: 'Kobe Bryant'
    }
  
  ];
  
  let questionNumber= 0;
  let score= 0;
  
  function startQuiz () {
    $('.quizStartPage').on('click','.startButton', function(event) {
      $('.quizStartPage').remove();
      $('.questionAnswerForm').css('display','block');
      $('.questionNumber').text(1);
    });
  }
  
  function generateQuestion() {
    if (questionNumber < STORE.length) {
      return `<div class="question-${questionNumber}">
      <h2>${STORE[questionNumber].question}</h2>
      <form>
      <fieldset>
      <label class="answerChoice">
      <input type="radio" name="answer" value= "${STORE[questionNumber].answers[0]}" required>
      <span>${STORE[questionNumber].answers[0]}</span>
      </label>
      <label class="answerChoice">
      <input type="radio" name="answer" value= "${STORE[questionNumber].answers[1]}" required>
      <span>${STORE[questionNumber].answers[1]}</span>
      </label>
      <label class="answerChoice">
      <input type="radio" name="answer" value= "${STORE[questionNumber].answers[2]}" required>
      <span>${STORE[questionNumber].answers[2]}</span>
      </label>
      <label class="answerChoice">
      <input type="radio" name="answer" value= "${STORE[questionNumber].answers[3]}" required>
      <span>${STORE[questionNumber].answers[3]}</span>
      </label>
      <button type="submit" class="submitButton">Submit</button>
      </fieldset>
      </form>
      </div>`;
      } else {
       renderResults();
       restartQuiz();
       $('.questionNumber').text(10)
      }
  }
  
  function renderQuestion() {
    $('.questionAnswerForm').html(generateQuestion());
  }
  
  function changeQuestion() {
    questionNumber ++;
    $('.questionNumber').text(questionNumber+1);
  }
  
  function changeScore() {
    score ++;
  }
  
  function chooseAnswer() {
    $('form').on('submit', function(event) {
      event.preventDefault();
      let chosen= $('input:checked');
      let answer= chosen.val();
      let correctAnswer= `${STORE[questionNumber].correctAnswer}`;
      if (answer === correctAnswer) {
      chosen.parent().addClass('correct');
      ifAnswerIsCorrect();
      } 
      else {
      chosen.parent().addClass('wrong');
      ifAnswerIsWrong();
      }
      }); 
    }
  
  function giveCorrectAnswerFeedback() {
   let correctAnswer= `${STORE[questionNumber].correctAnswer}`;
   $('.questionAnswerForm').html(`<div class="correctFeedback">
   <p>Correct!</p>
   <button type=button class="nextButton">Next</button></div>`);
  }
  
  function ifAnswerIsCorrect(){
    giveCorrectAnswerFeedback();
    updateScore();
  }
  
  function giveWrongAnswerFeedback () {
    let correctAnswer= `${STORE[questionNumber].correctAnswer}`;
    $('.questionAnswerForm').html(`<div class="wrongFeedback">
    <p>Incorrect!<br>The correct answer is <span>"${correctAnswer}"</span></p>
    <button type=button class="nextButton">Next</button></div>`);
  }
  
  function ifAnswerIsWrong() {
   giveWrongAnswerFeedback();
  }
  
  function updateScore () {
   changeScore();
   $('.score').text(score);
  }
  
  function renderNextQuestion() {
   $('main').on('click', '.nextButton', function(event) {
     changeQuestion();
     renderQuestion();
     chooseAnswer();
   });
  }
  
  function renderResults() {
    if(score>=8) {
      $('.questionAnswerForm').html(`<div class="finalResults"><h3>Great Job!</h3><p>Score: ${score} / 10</p><p>You're an NBA Expert!</p><button type="button" class="restartButton">Retake Quiz</button></div>`);
    } else if(score<8 && score>=6) {
      $('.questionAnswerForm').html(`<div class="finalResults"><h3>Not Bad!</h3><p>Score: ${score} / 10</p><p>You're okay but could be better.</p><button type="button" class="restartButton">Retake Quiz</button></div>`);
    } else {
      $('.questionAnswerForm').html(`<div class="finalResults"><h3>Terrible!</h3><p>Score: ${score} / 10</p><p>You Suck!</p><button type="button" class="restartButton">Retake Quiz</button></div>`);
      }
    }
  
  function restartQuiz() {
   $('main').on('click', '.restartButton', function(event) {
    location.reload();
   });
  }
  
  
  function runQuiz() {
   startQuiz();
   renderQuestion();
   chooseAnswer();
   renderNextQuestion();
  }
  
  $(runQuiz);
  