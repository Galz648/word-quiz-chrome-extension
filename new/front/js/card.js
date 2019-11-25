// card class that implements


```
to do -
# add defaulty values in constructor
# add CardX class
# inherit from Card 

```


```
Card TO DO:
    * add a getter and a setter to when the card 
```
class Card {
    
    Constructor(easiness=2.5, repetitions=0, interval=1) {
        this.easiness = easiness;
        this.repetitions = repetitions;
        this.interval = interval;
        // this.time = # current_time (time created)
    }
    
    calculate_interval(quality) {
        this.easiness = Math.max(1.3, this.easiness + 0.1 - (5.0 - quality) * (0.08 + (5.0 - quality) * 0.02))
        if (quality < 3) {
            this.repetitions = 0;
        }
        else {
            this.repetitions += 1;
        }
        if (this.repetitions == 1) {
            this.interval = 1
        } 
        else if (this.repetitions == 2) {
            this.interval = 6;
        }
        else {
            this.interval *= this.easiness;
        }
    }

    next_interval() {
        return Math.ceil(this.interval);
    }
}


class CardCompleteSentence extends Card{
    Constructor(word, easiness=2.5, repetitions=0, interval=1, ) {
        super(easiness=2.5, repetitions=0, interval=1);
        
        this.word = word;
        this.quizType = 'CompleteSentence';

    }

}










class Card {
    
    Constructor(easiness=2.5, repetitions=0, interval=1) {
        this.easiness = easiness;
        this.repetitions = repetitions;
        this.interval = interval;
        // this.time = # current_time (time created)
    }
    
    calculate_interval(quality) {
        this.easiness = Math.max(1.3, this.easiness + 0.1 - (5.0 - quality) * (0.08 + (5.0 - quality) * 0.02))
        if (quality < 3) {
            this.repetitions = 0;
        }
        else {
            this.repetitions += 1;
        }
        if (this.repetitions == 1) {
            this.interval = 1
        } 
        else if (this.repetitions == 2) {
            this.interval = 6;
        }
        else {
            this.interval *= this.easiness;
        }
    }

    next_interval() {
        return Math.ceil(this.interval);
    }
}


class CardCompleteSentence extends Card{
    Constructor(word, easiness=2.5, repetitions=0, interval=1, ) {
        super(easiness=2.5, repetitions=0, interval=1);
        
        this.word = word;
        this.quizType = 'CompleteSentence';

    }

}



class Quiz {
    
    Constructor(cardsNum=3, length, ) {
        this.cardsNum = cardsNum;
        this.length = length;
    }
  }

class QuizCompleteSentence extends Quiz{
    Constructor(cardsNum,length, quizType) {
        super(cardsNum, length, ref);

        this.quizType = quizType;
        this.ref = db.ref(ref)
    }

    quizLoop() {
        // preparing for quiz
        let loop = true;
        var quiz = await this.ref.orderByChild("interval").limitToLast(cards).once("value");
        // start player quiz game
        while (loop === true) {
            // 
        }
    }
}

