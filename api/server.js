import cors from 'cors'
import express from 'express'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/api/triangulate', (req, res) => {
  const { length, width, height } = req.body

  // Определение вершин куба
  const vertices = [
    // Передняя грань
    -length / 2,
    -height / 2,
    width / 2, // Вершина 0
    length / 2,
    -height / 2,
    width / 2, // Вершина 1
    length / 2,
    height / 2,
    width / 2, // Вершина 2
    -length / 2,
    height / 2,
    width / 2, // Вершина 3

    // Задняя грань
    -length / 2,
    -height / 2,
    -width / 2, // Вершина 4
    length / 2,
    -height / 2,
    -width / 2, // Вершина 5
    length / 2,
    height / 2,
    -width / 2, // Вершина 6
    -length / 2,
    height / 2,
    -width / 2, // Вершина 7
  ]

  // Индексы для триангуляции каждой грани куба
  const indices = [
    // Передняя грань (треугольники 0, 1)
    0, 1, 2, 0, 2, 3,

    // Задняя грань (треугольники 2, 3)
    4, 6, 5, 4, 7, 6,

    // Верхняя грань (треугольники 4, 5)
    3, 2, 6, 3, 6, 7,

    // Нижняя грань (треугольники 6, 7)
    0, 5, 1, 0, 4, 5,

    // Левая грань (треугольники 8, 9)
    0, 3, 7, 0, 7, 4,

    // Правая грань (треугольники 10, 11)
    1, 6, 2, 1, 5, 6,
  ]

  res.json({ vertices, indices })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
