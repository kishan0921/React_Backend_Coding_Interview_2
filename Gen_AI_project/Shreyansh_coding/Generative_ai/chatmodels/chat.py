from dotenv import load_dotenv
load_dotenv()

from langchain.chat_models import init_chat_model
model = init_chat_model("gpt-4.1") #gpt-5
# print(model)



# Way-01
# response = model.invoke("What is cricket?")
# # print(response)
# print(response.content)   #organize way result

#Way - 02  (Open AI)
model = ChatOpenAI(model = 'gpt-5')
response = model.invoke("what is cricket")
print(response.content)


#Way - 01  (Gemini AI Model)
model = ChatOpenAI(model = 'google_genai:gemini-3.7-flash')
response = model.invoke("Give me a paragraph on Machine Learning")
print(response.content)

#Way - 02  (Gemini AI Model)
model = ChatOpenAI(model ="gemini-2.5-flash-lite")
response = model.invoke("Give me a paragraph on Machine Learning")
print(response.content)


# Way - 01 (Groq AI Model)
from langchain_groq import ChatGroq
model = ChatGroq (model = "openai/gpt-oss-120b")
response = model.invoke("give me a paragraph on Machine")
print(response.content)


# Way - 01 (Mistral AI Model)
from langchain_mistralai import ChatMistralAI
model = ChatMistralAI(model = "mistral-small-2506", temparature=)
response = model.invoke("Tell me a joke about AI")
print(response.content)


# Way - 02 (Mistral AI Model)
# Note: temparature=1 (parameter) (highly creative responsez like - poem, images description) , temparature= 0 (related to maths,research)
# Note: max_tokens = 20 (token is equal to words, or equal to sentence, based on the models) 
model = ChatMistralAI(model = "mistral-small-2506", temparature=0.9,max_tokens=20)
response = model.invoke("write a poem on AI")
print(response.content)

