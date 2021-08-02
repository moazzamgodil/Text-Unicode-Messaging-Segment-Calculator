# Text & Unicode Messaging Segment Calculator

Let's checkout the calcultor [here](https://moazzamgodil.github.io/Text-Unicode-Messaging-Segment-Calculator/) and test your SMS copy length now.

## What is an SMS Segment?

SMS message segments are the character batches that phone carriers use to measure text messages. Messages are charged per message segment, so clients leveraging SMS greatly benefit from understanding the nuances of how messages will be split.

## Segment Breakdown

The character limit for a stand-alone SMS segment is 160 characters (GSM-7  encoding) or 70 characters (UCS-2  encoding) based on the encoding type. However, most phones and networks support concatenation, offering longer-form SMS messages of up to 1530 characters (GSM-7) or 670 characters (UCS-2).

- **GSM-7 Encoding**
  - Messages exceeding the 160 character limit will now be segmented into 153 character segments and sent individually, then rebuilt by the recipient’s device. For example, a 161 character message will be sent as two messages, one with 153 characters and the second with 8 characters.
- **UCS-2 Encoding**
  - If you include non-GSM characters such as Emojis, Chinese, Korean, or Japanese script in SMS messages, those messages have to be sent via UCS-2 encoding. Messages exceeding the initial segment limit of 70 characters will cause the entire message to be concatenated into 67 character message segments. For example, a 71 character message will be sent as two messages, one with 67 characters and the second with 4 characters.
