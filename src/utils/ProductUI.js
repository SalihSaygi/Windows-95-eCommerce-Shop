function shippingSwitch(shippingOptions) {
  const options = shippingOptions.map(shippingOption => {
    switch (shippingOption) {
      case 'UPS-FirstClass':
        return '2-5';
      case 'UPS-Priority':
        return '1-3';
      case 'UPS-PriorityExpress':
        return '1-2';
      case 'USPS-FirstClass':
        return '~';
      case 'Priority Mail International':
      default:
        return '';
    }
  });
  return options;
}

export { shippingSwitch };
