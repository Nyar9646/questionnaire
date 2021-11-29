import React, { useState } from 'react';

// form のロジックを担当するライブラリ（バリデーション、stateとの連携）
import { Controller, useForm } from 'react-hook-form'
// formやボタンなどの見た目をいい感じにしてくれるライブラリ
import { Container, Input } from '@material-ui/core'

import { collection, addDoc } from '@firebase/firestore';
import db from './config/firebase'

const yes = '1', no = '0', doNotKnow = '0'
const patternDate = '/(19[0-9]{2}|20[0-9]{2})(0[1-9]|1[1-2])(0[1-9]|[12][0-9]|3[01])/'

const styles = {
  valErr: { color: 'red' },
}

export default function Home() {
  const { register, handleSubmit, formState: { errors }, control } = useForm()
  const [isDisp, setIsDisp] = useState({ isLarning: 1, wasLarning: 0 })

  const onSubmit = data => {
    console.log(data)
    const docRef = addDoc(collection(db, 'answers'), data)
  }

  const handleIsLarning = e => {
    setIsDisp({ isLarning: e.target.value, wasLarning: isDisp.wasLarning })
  }

  const handleWasLarning = e => {
    setIsDisp({ isLarning: isDisp.isLarning, wasLarning: e.target.value })
  }

  return (
    <Container>
      <h1>プログラミング学習に関するアンケート</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div>
          <label htmlFor="name">Q1. 名前を入力してください（匿名可）</label><br />
          <Controller
            name="name"
            defaultValue=""
            control={control}
            render={({ field }) => <Input id="name" {...field} />}
          />
        </div>
        <div>
          <label htmlFor="birth">Q2. 生年月日を入力してください。(例： 19900101)</label><br />
          <Controller
            name="birth"
            defaultValue=""
            control={control}
            rules={{ required: true, pattern: { patternDate } }}
            render={({ field }) => <Input id="birth" {...field} />}
          />
          {/* <input id="birth" {
            ...register("birth", {
              required: true,
              maxLength: 8,
              pattern: /(19[0-9]{2}|20[0-9]{2})(0[1-9]|1[1-2])(0[1-9]|[12][0-9]|3[01])/
            })
          } />
          {
            errors.birth?.type === 'required'
            && <span style={styles.valErr}>このフィールドは回答必須です</span>
          }
          {
            errors.birth?.type === 'pattern'
            && <span style={styles.valErr}>yyyymmdd形式で入力してください</span>
          } */}
        </div>
        <div>
          <span>Q3. 現在、プログラミングを学習していますか？</span><br />
          <input type="radio" id="isLarning1"
            onClick={handleIsLarning}
            {...register("isLarning", { required: true })}
            value={yes}
          />
          <label htmlFor="isLarning1">はい</label>
          <input type="radio" id="isLarning2"
            onClick={handleIsLarning}
            {...register("isLarning", { required: true })}
            value={no}
          />
          <label htmlFor="isLarning2">いいえ</label>
          <input type="radio" id="isLarning3"
            onClick={handleIsLarning}
            {...register("isLarning", { required: true })}
            value={doNotKnow}
          />
          <label htmlFor="isLarning3">わからない</label>
          {
            errors.isLarning
            && <span style={styles.valErr}>このフィールドは回答必須です</span>
          }
        </div>
        <div>
          <span>Q4. これまでに、プログラミングを学習したことがありますか？</span><br />
          <input type="radio" id="wasLarning1"
            onClick={handleWasLarning}
            {...register("wasLarning", { required: true })}
            value={yes}
          />
          <label htmlFor="wasLarning1">はい</label>
          <input type="radio" id="wasLarning2"
            onClick={handleWasLarning}
            {...register("wasLarning", { required: true })}
            value={no}
          />
          <label htmlFor="wasLarning2">いいえ</label>
          <input type="radio" id="wasLarning3"
            onClick={handleWasLarning}
            {...register("wasLarning", { required: true })}
            value={doNotKnow}
          />
          <label htmlFor="wasLarning3">わからない</label>
          {
            errors.wasLarning && <span style={styles.valErr}>このフィールドは回答必須です</span>
          }
        </div>
        <div style={{
          visibility: (isDisp.isLarning === yes || isDisp.wasLarning === yes) ? 'visible' : 'hidden'
        }}>
          <label htmlFor="larningList">Q5. 今まで学習したことのあるプログラミング言語を全て教えてください</label><br />
          <textarea id="larningList" {...register("larningList")} /><br />
        </div>
        <button tupe="submit">アンケートを提出する</button>
      </form>
    </Container>
  )
}
