// API 服务 - 用于获取诗词和知识数据

// JSON Server base URL
const API_BASE_URL = 'http://localhost:3001'

/**
 * 从 API 获取诗词数据
 */
export const fetchPoem = async (id) => {
  try {
    // json-server 会自动根据 id 过滤数组
    const response = await fetch(`${API_BASE_URL}/poems?id=${id}`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch poem')
    }
    
    const data = await response.json()
    return data[0] || null
  } catch (error) {
    console.error('Error fetching poem:', error)
    throw error
  }
}

/**
 * 获取诗词列表
 */
export const fetchPoemsList = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/knowledge`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch knowledge data')
    }
    
    const data = await response.json()
    const category = data.categories.find(c => c.id === 'literature')
    
    // 提取所有诗词
    const poems = []
    category.subcategories.forEach(sub => {
      sub.items.forEach(item => {
        poems.push({
          id: item.id,
          title: item.title,
          author: item.author,
          dynasty: '现代',
          tags: item.tags
        })
      })
    })
    
    return poems
  } catch (error) {
    console.error('Error fetching poems list:', error)
    throw error
  }
}

/**
 * 从 API 获取知识分类数据
 */
export const fetchKnowledgeData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/knowledge`)
    
    if (!response.ok) {
      throw new Error('Failed to fetch knowledge data')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching knowledge data:', error)
    throw error
  }
}
