import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from newsapi import NewsApiClient

def _insertData(firedb, top_headlines):
	messages_ref = firedb.collection(u'messages_check')
	topics_ref = firedb.collection(u'topics_check')

	headlines_topic = topics_ref.document(u'Headlines')
	headlines_doc = headlines_topic.get()
	headlines_doc_dict = headlines_doc.to_dict()
	message_data_doc_ref_arr = []

	if headlines_doc_dict != None:
		message_data_doc_ref_arr = headlines_doc_dict['valid_messages']
	
	if top_headlines['status'] == 'ok':
		
		for news in top_headlines['articles']:
			doc_ref = messages_ref.document()

			message_data = {
				'claps' : 0,
				'topic': headlines_topic,
				'message': news,
			}

			doc_ref.set(message_data)			
			message_data_doc_ref_arr.append(doc_ref)

		topic_data = {
			'title': u'Headlines',
			'valid_messages': message_data_doc_ref_arr[::-1],
		}
		headlines_topic.set(topic_data)

def _getFirebaseDBObj():
	cred = credentials.Certificate('./serviceAccountKey.json')
	firebase_admin.initialize_app(cred)
	firedb = firestore.client()
	return firedb

def _getNews():
	newsapi = NewsApiClient(api_key='aa67ccb4fba148feb5dcd066255dee50')
	top_headlines = newsapi.get_top_headlines(sources='the-hindu')
	return top_headlines

def main():
	firedb = _getFirebaseDBObj()
	top_headlines = _getNews()
	_insertData(firedb, top_headlines)

if __name__ == '__main__':
	main()