export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  description: string[];
  sizes: string[];
  consist: string;
  color: string;
  collection: {
    id: string;
    title: string;
    description: string;
  };
}

export const products: Product[] = [
  {
    id: 1,
    image: '/dissection_black/dissection_black_1-min.jpg',
    title: 'Футболка «brain dissection black»',
    price: 3290,
    description: [
      'вышитый логотип artewear.',
      'премиального футер',
      'свободный крой',
      'круглый вырез горловины с обтачкой кашкорсе',
      'спущенные плечи',
      'плотность 240гр'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    consist: 'Состав: 80% хлопок, 20% полиэстер',
    color: 'черный',
    collection: {
      id: 'dissection',
      title: 'DISSECTION',
      description: 'Коллекция, вдохновленная анатомией человеческого мозга. Каждая деталь тщательно проработана, чтобы передать сложность и красоту нейронных связей.'
    }
  },
  {
    id: 2,
    image: '/dissection_white/dissection_white_3-min.jpg',
    title: 'Футболка «brain dissection white»',
    description: [
      'вышитый логотип artewear.',
      'премиального футер',
      'свободный крой',
      'круглый вырез горловины с обтачкой кашкорсе',
      'спущенные плечи',
      'плотность 240гр'
    ],
    price: 3290,
    sizes: ['S', 'M', 'L', 'XL'],
    consist: 'Состав: 80% хлопок, 20% полиэстер',
    color: 'белый',
    collection: {
      id: 'dissection',
      title: 'DISSECTION',
      description: 'Коллекция, вдохновленная анатомией человеческого мозга. Каждая деталь тщательно проработана, чтобы передать сложность и красоту нейронных связей.'
    }
  },
  {
    id: 3,
    image: '/spine/spine_3-min.jpg',
    title: 'Футболка черная «spine»',
    price: 3990,
    description: [
      'вышитый логотип artewear.',
      'премиального футер',
      'свободный крой',
      'круглый вырез горловины с обтачкой кашкорсе',
      'спущенные плечи',
      'плотность 240гр'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    consist: 'Состав: 80% хлопок, 20% полиэстер',
    color: 'черный',
    collection: {
      id: 'spine',
      title: 'SPINE',
      description: 'Минималистичная коллекция, основанная на элегантности позвоночника. Чистые линии и лаконичный дизайн подчеркивают естественную красоту анатомии.'
    }
  },
  {
    id: 4,
    image: '/aneurysm/aneurysm_4-min.jpg',
    title: 'Футболка молочная «aneurysm» с велюр эффектом',
    price: 3590,
    description: [
      'вышитый логотип artewear.',
      'премиального футер',
      'свободный крой',
      'круглый вырез горловины с обтачкой кашкорсе',
      'спущенные плечи',
      'плотность 240гр'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    consist: 'Состав: 80% хлопок, 20% полиэстер',
    color: 'белый',
    collection: {
      id: 'aneurysm',
      title: 'ANEURYSM',
      description: 'Экспериментальная коллекция, исследующая тему сосудистых аномалий. Сложные принты и необычные текстуры создают уникальный визуальный эффект.'
    }
  }
]; 