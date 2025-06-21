class Phone:
    def __init__(self, phone_number):
        self.phone_number = phone_number
        self.call_history = []
        self.messages = []
        self.outgoing_messages = []  
        self.incoming_messages = []
    def call(self, other_phone):
        message = f'le numéro {self.phone_number} appelle {other_phone.phone_number}'
        self.call_history.append(message)
    def show_call_history(self):
        print(self.call_history)
    def send_message(self, other_phone):
        data_msg = {
            "to": other_phone.phone_number,
            "from": self.phone_number,
            "content": "on teste"
        }
        self.messages.append(data_msg)
        self.outgoing_messages.append(data_msg)
        other_phone.incoming_messages.append(data_msg)
        return self.messages

    def show_outgoing_messages(self):
        print(f"Messages envoyés depuis {self.phone_number} :")
        for msg in self.outgoing_messages:
            print(f"À {msg['to']}: {msg['content']}")

    def show_incoming_messages(self):
        print(f"Messages reçus par {self.phone_number} :")
        for msg in self.incoming_messages:
            print(f"De {msg['from']}: {msg['content']}")
Phone1 = Phone("0603942851")
Phone2 = Phone("0650555299")
Phone1.call(Phone2)
Phone1.send_message(Phone2)
print("Historique des appels :", Phone1.call_history)
Phone1.show_outgoing_messages()
Phone2.show_incoming_messages()

