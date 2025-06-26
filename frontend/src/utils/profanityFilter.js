import leoProfanity from 'leo-profanity'

leoProfanity.loadDictionary()

export const filterProfanity = (text) => {
  return leoProfanity.clean(text)
}
