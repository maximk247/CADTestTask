import { Button, Form, InputNumber, Tooltip } from 'antd'
import React from 'react'
import { BoxFormProps } from '../../../interfaces/props/BoxForm.interface'
import styles from './BoxForm.module.css'

const BoxForm: React.FC<BoxFormProps> = ({ inputValues, setInputValues, onFinish }) => {
  return (
    <Form layout='vertical' className={styles['box-form']} initialValues={inputValues}>
      <Form.Item label='Height' className={styles['box-form__item']}>
        <Tooltip title='Set the height of the box'>
          <InputNumber
            min={1}
            value={inputValues.height}
            onChange={value => setInputValues({ ...inputValues, height: value || 1 })}
          />
        </Tooltip>
      </Form.Item>

      <Form.Item label='Width' className={styles['box-form__item']}>
        <Tooltip title='Set the width of the box'>
          <InputNumber
            min={1}
            value={inputValues.width}
            onChange={value => setInputValues({ ...inputValues, width: value || 1 })}
          />
        </Tooltip>
      </Form.Item>

      <Form.Item label='Length' className={styles['box-form__item']}>
        <Tooltip title='Set the length of the box'>
          <InputNumber
            min={1}
            value={inputValues.length}
            onChange={value => setInputValues({ ...inputValues, length: value || 1 })}
          />
        </Tooltip>
      </Form.Item>

      <Form.Item>
        <Button type='primary' onClick={onFinish}>
          Update Box
        </Button>
      </Form.Item>
    </Form>
  )
}

export default BoxForm
