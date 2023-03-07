export default function validate(input) {

  const errors = {}; 
  const regexName = /^[\p{L}\s.'-]+$/u; 
  const regexNumLifeSpan = new RegExp("^[0-9-]+$"); 
  const regexNum = new RegExp("^[0-9]+$");

  //----------------------------------------------------------------
  if (!input.name) {
    errors.name = "This cannot be incomplete.";
  } 
  if (input.name.length < 3 || input.name.length > 20) {
    errors.name = "It has to be between 3 and 20 characters.";
  } 
  if (!regexName.test(input.name))
    errors.name = "You can only use letters.";
  //----------------------------------------------------------------
   if (!input.heightMin) {
    errors.heightMin = "This cannot be incomplete.";
  }  
  if (input.heightMin <= 0 || input.heightMin >= 100) {
    
    errors.heightMin = "Must be greater than 1 and less than 100.";
  }  
  if (!regexNum.test(input.heightMin))
    
    errors.heightMin = "You can only use numbers.";
    
    
  if (input.heightMin > input.heightMax) {
      errors.heightMin = 'The min height cannot be bigger than the max height.'
    }
  //----------------------------------------------------------------
  if (!input.heightMax) {
    errors.heightMax = "This cannot be incomplete.";
  } 
  if (input.heightMax <= 0 || input.heightMax >= 100) {
    
    errors.heightMax = "Must be greater than 1 and less than 100.";
  } 
  if (input.heightMax < input.heightMin) {
    
    errors.heightMax = "The minimum height cannot be greater than the maximum.";
  } 
  if (!regexNum.test(input.heightMax))
    
    errors.heightMax = "You can only use numbers.";
    
  if (input.weightMin > input.weightMax) {
      errors.weightMin = 'The min weight cannot be bigger than the max weight.'
    }
  //----------------------------------------------------------------
 if (!input.weightMin) {
    errors.weightMin = "This cannot be incomplete.";
  } 
  if (input.weightMin <= 0 || input.weightMin >= 100) {
    errors.weightMin = "Must be greater than 1 and less than 100.";
  } 
  if (!regexNum.test(input.weightMin))
    errors.weightMin = "You can only use numbers.";
  //----------------------------------------------------------------
 
  if (!input.weightMax) {
    errors.weightMax = "This cannot be incomplete.";
  } 
  if (input.weightMax <= 0 || input.weightMax >= 100) {
    errors.weightMax = "Must be greater than 1 and less than 100.";
  } 
  if (input.weightMax < input.weightMin) {
    errors.weightMax = "The minimum weight cannot be greater than the maximum.";
  } 
  if (!regexNum.test(input.weightMax))
    errors.weightMax = "You can only use numbers.";
  //----------------------------------------------------------------
  
  if (!input.life_span) {
    
    errors.life_span = "This cannot be incomplete.";
  } 
  if (!input.life_span.includes("-")) {
    
    errors.life_span =
      "You must include a '-' within the minimum or maximum average.";
  }
  if (!input.life_span.charAt(input.life_span.indexOf("-") + 1)) {
   
    errors.life_span = "There must be a number behind the '-'.";
  } 
  if (
    Number(input.life_span.split("-")[0]) >
    Number(input.life_span.split("-")[1])
  ) {
    
    errors.life_span = "The minimum year must be less than the maximum year.";
  } 
  if (regexNumLifeSpan.test(input.life_span) === false) {
    errors.life_span = "No spaces, only positive numbers and '-'!";
  } 
  if (input.life_span.charAt(0) === "-") {
    errors.life_span = "You must add an initial value.";
  }
  if (input.life_span.split('-')[1] > 25) {
    errors.life_span = 'You must enter values below 25 years.'
  }
  //----------------------------------------------------------------
 
  if (!input.temperament.length < 0)
    errors.temperament = "This cannot be incomplete.";
  //----------------------------------------------------------------

  
  if (input.image && !/(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/.test(input.image)) {
    errors.image = "The URL is not valid try another format.";
  }
  
  return errors;
  
}