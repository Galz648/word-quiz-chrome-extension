# Card class - where a card is a part of a quiz
# 
# The Card class implements the Spaced Repetition - SM2 algorithm: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2

# time format
time_fmt = "%Y-%m-%d"

class Card:
    def __init__(self, easiness=2.5, repetition=0, interval=1):
        self.easiness = easiness # EF' = EF + (0.1-(5-Q) * (0.08+(5-Q) * 0.02))
        self.repetition = repetition 
        self.interval = interval # I(n>2) = I(n-1) * EF
        self._time = datetime.datetime.now(time_fmt)
    
    @property
    def last_used(self):
        """
        Get the last time the card was used
        """
        return self._time

    @last_used.setter
    def last_used(self, time):
        """
        Set the last time used
        """
        self._time = time

    def next_time(self):                                                        
        
        return math.ceil(self.interval)

    def calculate_interval(self, quality):
        """
        Spaced Repetition algorithm implementation
        """
        assert quality >= 0 and quality <= 5
        self.easiness = max(1.3, self.easiness + 0.1 - (5.0 - quality) * (0.08 + (5.0 - quality) * 0.02))
        if quality < 3: 
        self.repetitions = 0
        else: 
            self.repetitions += 1
        if self.repetitions == 1: 
            self.interval = 1
        elif self.repetitions == 2: 
            self.interval = 6
        else: 
            self.interval *= self.easiness

        #return self.interval
        # self.time = time



    


"""
BRAIN STORMING
easiness parameter brainstorming
    t < 10, r = true = 5
    t > 10, r = true = 4
    t > 30, r = true = 3
    t < 10, r = false = 2
    t > 30, r = false = 1
    t > 30, r = null = 0

    refreshment_iteration = 0
    if timedelta since last test > 2 weeks and quality > 3, word quality = 3 <== refreshment test
    refreshment_iteration =+ 1, if refreshment_iteration = 1, then word to trashbin
"""

class CardCompleteSentence(Card):

    def __init__(self, word,  easiness=2.5, repetition=0, interval=1):
        # inherit from card class
        super().__init__() # easiness, repetition, interval
        self.word = word
        # 
