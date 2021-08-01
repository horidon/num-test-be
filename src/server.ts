import dotenv from 'dotenv'
import express from 'express'
import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { T9Search } from 't9-plus'
import * as Utils from './utils'
// @ts-ignore
import words from 'an-array-of-english-words'

dotenv.config()

const t9 = new T9Search()
t9.setDict(words)

interface IArgs {
  num: string
}

const getWords = (args: IArgs) => {
  const num = args.num.trim().match(/[2-9]/gmi).join('')

  const prediction = t9.predict(num)

  return prediction.map(p => ({ word: p }))
}

const getMatch = (args: IArgs) => {
  const num = args.num.trim().match(/[2-9]/gmi).join('')

  const res = Utils.productNumbers(num)
  if(!res) return { match: [] }

  return { match: res.map(r => r.join('')) }
}

const bootstrap = () => {
  const schema = buildSchema(`
    type Query {
        words(num: String!): [Word]
        matches(num: String!): Match
    },
    type Word {
        word: String
    },
    type Match {
        match: [String]
    }
  `)

  const root = {
    words: getWords,
    matches: getMatch
  }

  const app = express()
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  }))

  const port = parseInt(process.env.PORT) || 4000
  app.listen(port, () => console.log(`Up and running on port ${port}`))
}

bootstrap()