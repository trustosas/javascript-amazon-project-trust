import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0
  }, {
    id: "2",
    deliveryDays: 3,
    priceCents: 499
  }, {
    id: "3",
    deliveryDays: 1,
    priceCents: 999
  }
]

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  
  return deliveryOption;
}

export function calculateDeliveryDate(deliveryOption) {
  
  const today = dayjs();
  
  let deliveryDay = today.add(deliveryOption.deliveryDays, 'days');
  
  if (deliveryDay.day() === 0) {
    deliveryDay = deliveryDay.add(1, 'days');
  } else if (deliveryDay.day() === 6) {
    deliveryDay = deliveryDay.add(2, 'days');
  }
  
  const dateString = deliveryDay.format('dddd, MMMM D');
  
  return dateString

}