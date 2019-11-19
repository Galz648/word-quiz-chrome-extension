# Card class - where a card is a part of a quiz
# EF' = EF + (0.1-(5-Q) * (0.08+(5-Q) * 0.02))
# The Card class implements the Spaced Repetition - SM2 algorithm: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
time_fmt = "%Y-%m-%d"
class Card:
    def __init__(self, time, easiness=2.5, repetition=0, interval=1):
        self.easiness = easiness
        self.repetition = repetition
        self.interval = interval
        self.time = datetime.datetime.now(time_fmt)                         #2009-01-06 15:08:24.789150

    def is_new(self):
        return self.repetitions == 0

        # I(1) = 1 - Interval is 1 day in the 1st repetition
        # I(2) = 6 - Interval is 6 days in the 2nd repetition
        # I(n>2) = I(n-1) * EF
        # I(3) = I(2)*1.3 - suppose last interval was 6 days, and word was hard to indentify (E value of 1.3)
        # calculation => I(3) = ceil(6*1.3) = 8 days
        
    def next_time(self):                                                        
        return self.time + datetime.timedelta(days=math.ceil(self.interval))

        # current_time() +  datetime.timedelta(ceil(self.interval *= self.easiness))  3 * 1.3 = 4
        # t < 10, r = true = 5
        # t > 10, r = true = 4
        # t > 30, r = true = 3
        # t < 10, r = false = 2
        # t > 30, r = false = 1
        # t > 30, r = null = 0

        # refreshment_iteration = 0
        # if timedelta since last test > 2 weeks and quality > 3, word quality = 3 <== refreshment test
        # refreshment_iteration =+ 1, if refreshment_iteration = 1, then word to trashbin
    def penis(self, quality):
        assert quality >= 0 and quality <= 5
        self.easiness = max(1.3, self.easiness + 0.1 - (5.0 - quality) * (0.08 + (5.0 - quality) * 0.02))
        if quality < 3: 
        # self.repetitions = 0
            self.is_new()
        else: 
            self.repetitions += 1
        if self.repetitions == 1: 
            self.interval = 1
        elif self.repetitions == 2: 
            self.interval = 6
        else: 
            self.interval *= self.easiness
        # self.time = time


    # stack : 1, 6, 8, 
    # insert to stack - interval of 5
    # new_stack = 1,2,3,3,5,6
    