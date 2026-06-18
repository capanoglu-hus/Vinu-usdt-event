export interface FirebaseMessagePayload {
  notification?: {
    title?: string;
    body?: string;

  };
  
  data?: {
    sender?: string;
    receiver?: string;
    transactionHash?: string;
    rawAmount?: string; 
  };
}

