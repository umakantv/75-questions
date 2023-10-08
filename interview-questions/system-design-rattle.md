

# Design a database for Aadhar System

Aadhar

GET /users

SQL - Postgres/mysql

NUMBER, NOT NULL

Name
aadhar_number
Gender - VARCHAR(10), NOT NULL, 
date_of_birth - INT, NOT NULL, 
Pincode - INT, NOT NULL, 


Indices 
- pincode
- date_of_birth

111111, male, (19-32),

EXPLAIN select * from people where gender = ''

EXPLAIN ANALYZE select * from people where gender = ''

Sharding

1,00,00,000

male - 57,00,000

* 5001 - 5050 
select * from people where gender = 'male' limit 50 offset 5000;

select count(*) as totalRecords from people where gender = 'male'

5001-5050 of 57,00,000
{

}

auth_token: { "6:39": 50, "6:41": 0 }

GET /users -> time.minute() -> read the value + update the value

if (value > threshold) return 4xx


GET /emoji_reactions -> 
{
    channel_id,
    message_id,
}

message

customer_id
slack_message_id - 
created_at: 27th April, 
reactions: 

schedule job -> 4th May, 

select * from messages where customer_id = '' AND created_at <= 20th April and reactions != null limit 50 offset 100;

Rate Limiting

1 batch - 50 messages

async function processBatch(messages) {
    # GET /emoji

    # 
    if request failed because of Rate limit
        wait(); // 60 seconds
    
}

async function processRequest(customerId, offset, limit) {

    messages = getData()

    processBatch(messages)


}

customer_ids = [] // 50 customer_ids

async function processCustomer(id) {

    offset - 0, limit 50

    let messages = 
    while there are messages to be processed  {
        processRequest
    }
}

customer_ids.map()
