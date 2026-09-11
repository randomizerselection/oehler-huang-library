"""Deterministic text-and-QR poster, matching the launch graphics."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import qrcode
import zxingcpp

ROOT=Path(__file__).resolve().parents[3]
OUT=ROOT/'authoring/investment-course/outputs/stock-market-game-launch'
URL='https://www.stockmarketgame.org/login.html'
W,H=1240,1754
im=Image.new('RGB',(W,H),'#f7f4eb'); d=ImageDraw.Draw(im)
GREEN='#143f35'; INK='#20382f'; MUTED='#50665c'; COPPER='#b76d3f'
fonts={}
def font(size,strong=False):
 key=(size,strong)
 if key not in fonts:
  fonts[key]=ImageFont.truetype('C:/Windows/Fonts/seguisb.ttf' if strong else 'C:/Windows/Fonts/segoeui.ttf',size)
 return fonts[key]
def text(value,x,y,size=31,color=INK,strong=False):
 f=font(size,strong)
 assert x+d.textlength(value,font=f)<=W-54,(value,size)
 d.text((x,y),value,font=f,fill=color,anchor='lt')

d.rectangle((0,0,W,337),fill=GREEN)
d.rectangle((68,57,75,96),fill='#e7b184')
text('SUZHOU FOREIGN LANGUAGE SCHOOL',96,62,29,'#bde6d2')
text('STOCK MARKET GAME',68,125,65,'#fffaf0',True)
text('WEEKEND LOGIN',70,220,45,'#e7b184')
text('SFLS INVESTMENT 2026',71,286,21,'#bde6d2')

d.rounded_rectangle((62,365,1178,501),radius=19,fill='#eee0d1')
text('DUE SUNDAY 13 SEPTEMBER',92,392,39,GREEN,True)
text('8:00 pm (China time)  •  2026',92,448,32,INK)

qr=qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H,box_size=8,border=4)
qr.add_data(URL);qr.make(fit=True)
matrix=qr.get_matrix(); n=len(matrix); module=8; qrsize=n*module
qx=88; qy=541
d.rounded_rectangle((62,523,1178,963),radius=19,fill='#ffffff',outline='#d6dfd7',width=2)
# Exact QR modules, including a four-module quiet zone; no graphic overlay.
d.rectangle((qx,qy,qx+qrsize,qy+qrsize),fill='white')
for row,values in enumerate(matrix):
 for col,dark in enumerate(values):
  if dark:
   d.rectangle((qx+col*module,qy+row*module,qx+(col+1)*module-1,qy+(row+1)*module-1),fill='black')
text('SCAN TO LOG IN',554,573,39,GREEN,True)
text('The Stock Market Game',556,634,29)
text('Use your team login slip.',556,683,28,MUTED)
text('Already on your phone?',556,755,28,GREEN,True)
text('Save this image and scan',556,800,27,MUTED)
text('the QR code from your album.',556,841,27,MUTED)
text('stockmarketgame.org/login.html',556,905,24,COPPER)

def step(n,y,title,lines):
 d.ellipse((70,y,119,y+49),fill=GREEN)
 f=font(29,True)
 d.text((94,y+24),str(n),font=f,fill='white',anchor='mm')
 text(title,145,y+3,32,GREEN,True)
 for i,line in enumerate(lines):text(line,145,y+60+i*43,29,INK)

step(1,1002,'EVERYONE TRIES LOGIN',[
 'Each member tries the shared team account once.'])
step(2,1133,'ONE SCREENSHOT PER TEAM',[
 'HOME → Account Info: show the team ID, date,',
 'Total Equity and Cash Balance.'])
step(3,1306,'ORGANISER SENDS ME ONE QQ MESSAGE',[
 'Team number/name + all three names and roles',
 '+ each person’s login result + the screenshot.'])

d.rounded_rectangle((62,1502,1178,1696),radius=17,fill='#e9eee7')
text('No trades or company research this weekend.',90,1530,31,GREEN,True)
text('Login problem? Report it by the same deadline.',90,1584,29)
text('Keep your password private.',90,1635,28,MUTED)

target=OUT/'SMG-Weekend-Homework-QR.png'
im.save(target,optimize=True)
for label,picture in [('original',im),('phone-size',im.resize((620,877),Image.Resampling.LANCZOS))]:
 decoded=zxingcpp.read_barcode(picture)
 assert decoded and decoded.text==URL,(label,decoded)
 print('PASS:',label,'QR decodes to',decoded.text)
print(target)
