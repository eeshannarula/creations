
byte[] data=loadBytes("train.npy");
int total=1000;
byte[] outdata=new byte[total*784];
int outindex=0;
for(int n=0;n<total;n++){
float start=80+n*784;
for(int i=0;i<784;i++){
  int index=int(i+start);
  byte val=data[index];
  outdata[outindex]=val;
  outindex++;
  
  
}
}

saveBytes("train1000.bin",outdata);
