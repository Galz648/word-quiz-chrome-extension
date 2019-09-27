# this is a cli version of the word_quiz app
"""
to do list:
	0.5. write a function that copies shit from clipboard pyqt
	1. add a User class - contains user prefrences and info (dest_language, custom word_bank, save/update user information)
	2. save user information in a file using pickle
	3. move user dependant functionality from the Quiz class to the User class
	
"""

"""
######################
most basic functionality:
1. when a word is copied, copy the word  from the clipboard
2. store the word in the word bank
3. is this overkill ? create a word object and store information about it in the object
4. create a quiz on demand, and the runtime will be faster when information is stored -
   with in the word object
5. fix the random selection of quiz
######################
"""

import googletrans
from random import shuffle
from bidi import algorithm

# create translator object
translator = googletrans.Translator()

def language_name_to_id(language):
	language_id = dict(map(reversed, googletrans.LANGUAGES.items()))[str(language)]
	return language_id

def get_avaliable_languages():
	"""
	get the list of avaliable languages I could translate an expression into.

	return : list type object populated with strings referring to language names.
	"""
	languages_list = list(dict(map(reversed, googletrans.LANGUAGES.items())).keys())

	return languages_list

def translate_expression(expression, dest_language):
	# return the translation of an expression with a given dest_language
	dest_language_id = language_name_to_id(dest_language)
	print("dest_language_id: ", dest_language_id)
	translation = translator.translate(expression, dest=dest_language_id)
	translation = algorithm.get_display(translation.text)
	print('translation from translate expression')
	return translation

class User:
	def __init__(self, name):
		"""
		create a user with an associated name as well as a word bucket
		"""
		self.name = name
		self.word_bucket = {}
		self.dest_language = None

	def set_word(self, word):
		# look if the language dict exists inside word_bank
		# if it does add the word to it as [word.word] = translated word object 
		# else, create a word bank of the translated word's language and add the word - 
		# as done above
		pass
	def get_words(self, dest_language, word_amount, random=True):
		if random == False:
			pass
		
		else:
			# take a random dictionary
			return_value = self.word.bank.get(word.dest_language)[: ]
		
		if return_value is None:
			self.set_word_word_bank(word)
			
		else:
			return return_value
		
	
	def set_info(self):
		pass

	def get_info(self):
		pass
	
	def set_dest_language(self):
		pass


	def get_from_clipboard(self):
		"""
		linux:
			get user copies text from the SECONDARY clipboard
		"""
		pass
class Word:
	def __init__(self, word):
		self.word = word
		# translate the word and stored dest language
		# dest_language, word_translation = ...
		# occurence
	def __repr__(self):
		return self.__str__()


	def __str__(self):
		pass
		#return 'word: {}, word_translation: {}'.format(word, word_translation)


class Quiz:
	""" a Quiz class instance is a set of questions for the user to answer"""
	def __init__(self, user):
		self.user = user

		# keep the word_bank static for now, the intention is for it to be dynamic -
		# dependent upon 
		#example of a word_bank
		self.word_bank = self.user.word_bank 
		"""
		self.word_bank = {}
		self.english_word_bank = 
		'dog', 'cat', 'horse', 'magic', 'house'
		, 'car', 'possible', 'phone', 'bottle']
		"""
	def set_dest_language(self):
		"""
		1. print a list of avaliable languages to translate to
		2. let the user choose a preferred destination languages of of the 'avaliable languages list
		3. set the destination language to the chosen language by the user
		else - raise an error
		"""
		#1.
		print('list of avaliable languages: \n')
		languages_dict = dict(map(reversed, googletrans.LANGUAGES.items()))
		for language in languages_dict.keys():
			print(language)
		
		dest_language = input('choose a language to translate to: ')
		if dest_language in languages_dict.keys():
			dest_language_code = dict(map(reversed, googletrans.LANGUAGES.items()))[dest_language]
			
			return dest_language_code
		else:
			raise Exception('desired language not found')

	def generate_quiz(self, word):
		""""
		shuffle(self.word_bank)
		words = self.word_bank[:3]; words.append(self.word_to_translate)
		#shuffle(words)
		# src language code detection
		src_language = translator.detect(self.word_to_translate).lang
		print(src_language)

		try:
			translations = [algorithm.get_display(i.text) for i in translator.translate(words, src=src_language, dest=self.dest_language_code)]
		except Exception as e:
			print(e)
		else:
			self.translated_word = translations[-1]
			shuffle(translations)
			return translations
		"""
	def user_prompt(self, translations):
		# user prompt:
		print('select correct translation (index) - \n word: {}'.format(self.word_to_translate))
		
		for i, j in enumerate(translations):
			print('index: {}, word: {}'.format(i,j))
		
		chosen_index = int(input('chosen index (integer): '))
		chosen_word = translations[chosen_index]
		# evaluate chosen word against the translation of word_to_translate
		if chosen_word == self.translated_word:
			return True
		else:
			return False
 
""""
# dest language selection
dest_language = input('destination language: ').strip().casefold() # english, hebrew, hindu, german, japanese...

if dest_language in dict(map(reversed, googletrans.LANGUAGES.items())).keys(): # checks all the supported language
	dest_code = dict(map(reversed, googletrans.LANGUAGES.items()))['Hebrew']  # gets the language code
else:
	print('such a language does not exist in the languages dictionary')
# pretty sure this whole thing needs to go into the if statement
"""
#### error handling needs to be added here

def main():
	name = 'gal'
	word_to_translate = 'hello'  # ex - dog, cat, car. in practice we wont need to use this as it would be grabbed from the clipboard

	quiz = Quiz(name, word_to_translate)
	translated_words = quiz.generate_quiz()
	result = quiz.user_prompt(translated_words)
	print('result: ', result)

if __name__ == '__main__':
	main()
