// XML Mockups for SmartRecommend UI modules

// Default (Home) Module XML Mockup
export const HomeModuleXML = `
<ModuleView module="home">
  <WelcomeCard>
    <Content>
      Hi there! 👋 I'm your Smart Lifestyle Assistant. I can help you find the perfect credit card, book flights, discover hotels, or find shopping deals. What would you like help with today?
    </Content>
  </WelcomeCard>
  <SuggestionChips>
    <Chip icon="credit_card" text="Credit card for travel" />
    <Chip icon="flight" text="Budget flights Mumbai-Delhi" />
    <Chip icon="hotel" text="Hotels in Goa under ₹5000" />
    <Chip icon="shopping_bag" text="Electronics under ₹1000" />
  </SuggestionChips>
</ModuleView>
`;

// Travel Module XML Mockup
export const TravelModuleXML = `
<ModuleView module="travel">
  <Title icon="flight">Top Flight Deals ✈️</Title>
  <Cards>
    <Card>
      <Route>Mumbai to Delhi</Route>
      <Price>₹3,500</Price>
      <Offer>10% off on Axis Card</Offer>
      <Duration>2h 10m</Duration>
    </Card>
    <Card>
      <Route>Flight to Goa</Route>
      <Price>₹4,200</Price>
      <Offer>Flat ₹500 off with HDFC</Offer>
      <Duration>1h 30m</Duration>
    </Card>
    <Card>
      <Route>Business class to Bangalore</Route>
      <Price>₹9,800</Price>
      <Offer>20% off on Amex</Offer>
      <Duration>1h 45m</Duration>
    </Card>
  </Cards>
</ModuleView>
`;

// Hotel Module XML Mockup
export const HotelModuleXML = `
<ModuleView module="hotel">
  <Title icon="hotel">Recommended Hotels 🏨</Title>
  <Cards>
    <Card>
      <Name>Lemon Tree, Goa</Name>
      <Price>₹4,800/night</Price>
      <Rating>4.2 ⭐</Rating>
      <Feature>Free breakfast</Feature>
      <Amenities>Beach view, Free WiFi, Pool</Amenities>
    </Card>
    <Card>
      <Name>Taj Palace, Mumbai</Name>
      <Price>₹12,000/night</Price>
      <Rating>4.9 ⭐</Rating>
      <Feature>25% off with ICICI</Feature>
      <Amenities>Luxury, Spa, Sea view</Amenities>
    </Card>
    <Card>
      <Name>FabHotel Pune</Name>
      <Price>₹2,500/night</Price>
      <Rating>3.8 ⭐</Rating>
      <Feature>Budget pick</Feature>
      <Amenities>Clean, WiFi, Business area</Amenities>
    </Card>
  </Cards>
</ModuleView>
`;

// Shopping Module XML Mockup
export const ShoppingModuleXML = `
<ModuleView module="shopping">
  <Title icon="shopping_bag">Top Deals for You 🛍️</Title>
  <Cards>
    <Card>
      <Product>Noise Smartwatch</Product>
      <Price>₹1,999</Price>
      <Platform>Amazon</Platform>
      <Offer>5% cashback on SBI</Offer>
    </Card>
    <Card>
      <Product>JBL Earbuds</Product>
      <Price>₹2,699</Price>
      <Platform>Flipkart</Platform>
      <Offer>10% off with Kotak</Offer>
    </Card>
    <Card>
      <Product>Basic Electronics Combo</Product>
      <Price>₹899</Price>
      <Platform>Amazon</Platform>
      <Offer>Deal of the Day</Offer>
    </Card>
  </Cards>
</ModuleView>
`;