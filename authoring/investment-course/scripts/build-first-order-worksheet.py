"""Printable group ticket; run with the bundled Python runtime. No account access."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import A4
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'outputs/pdf/first-stock-order-group-worksheet.pdf'
OUT.parent.mkdir(parents=True, exist_ok=True)
pdfmetrics.registerFont(TTFont('YaHei', 'C:/Windows/Fonts/msyh.ttc', subfontIndex=0))
pdfmetrics.registerFont(TTFont('YaHeiBold', 'C:/Windows/Fonts/msyhbd.ttc', subfontIndex=0))
pdfmetrics.registerFontFamily('YaHei', normal='YaHei', bold='YaHeiBold')
W,H = A4
M = 38
INK = HexColor('#172d28')
GRAY = HexColor('#5c6461')
RULE = HexColor('#aab2ae')
c = canvas.Canvas(str(OUT), pagesize=A4)
c.setTitle('Planning your first stock trades - group worksheet')
c.setAuthor('Investment Course | Samuel Oehler-Huang')

def text(x,y,s,size=10,bold=False,color=INK):
    c.setFillColor(color); c.setFont('YaHeiBold' if bold else 'YaHei',size)
    c.drawString(x,H-y,s)

def para(y,s,size=10,width=None,x=M,leading=None):
    p=Paragraph(s,ParagraphStyle('body',fontName='YaHei',fontSize=size,leading=leading or size*1.45,textColor=INK))
    _,height=p.wrap(width or W-2*M,900)
    p.drawOn(c,x,H-y-height)
    return y+height

def line(y,x=M,width=None):
    c.setStrokeColor(RULE); c.setLineWidth(.5)
    c.line(x,H-y,x+(width or W-2*M),H-y)

def section(y,n,title):
    c.setFillColor(HexColor('#edf1ee')); c.rect(M,H-y-25,W-2*M,25,fill=1,stroke=0)
    text(M+9,y+17,f'{n}  {title}',11,True)

def box(x,y,label,size=9):
    c.setStrokeColor(GRAY); c.setLineWidth(.7); c.rect(x,H-y-1,8,8,fill=0,stroke=1)
    text(x+13,y,label,size)

def footer(page):
    line(799)
    text(M,816,'Investment Course  |  16 September 2026  |  Simulated trading 模拟交易',8,color=GRAY)
    text(W-M-29,816,f'{page} / 2',8,color=GRAY)

# Front: group thinking and a complete executable buy instruction.
text(M,43,'Our first stock order',22,True)
text(M,66,'小组首次股票订单',16,True)
text(M,88,'Complete together today. One agreed order per worksheet. 今天共同填写，每张表一笔订单。',9.5)
text(M,117,'Group 小组：________________     Date 日期：________________',10)
text(M,143,'Members 组员：________________   ________________   ________________',10)

section(160,'1','Choose a company  选择公司  |  4 minutes 分钟')
text(M,207,'Company 公司：____________________________   Ticker 股票代码：____________',10)
text(M,234,'What does this company do? 这家公司的主要业务是什么？',10)
line(256)
text(M,279,'Why are we considering buying its shares? 我们为什么考虑买入它的股票？',10)
line(301); line(325)
text(M,348,'One risk: what could go wrong? 一个风险：可能出现什么问题？',10)
line(370)
text(M,393,'Evidence / source + date 依据／来源与日期：',10)
line(415)

section(430,'2','Build the order  填写订单  |  6 minutes 分钟')
text(M,474,'Action 操作：BUY 买入       Number of shares 股数：____________',11,True)
text(M,493,'Use whole shares; the published SMG minimum buy is 10 shares. 买入至少10股，使用整股。',9)
box(M,519,'Market 市价单',10); box(M+179,519,'Buy limit 买入限价单',10)
text(M,544,'If limit: maximum price per share 限价（每股）：$________________',10)
text(M,569,'Reference price 参考价：$____________  Source / date / time 来源与时间：____________',9.3)
text(M,591,'No quote available? Leave it blank for the teacher to check. 无法查询时留空，由老师核对。',9)
text(M,617,'Our spending budget, including fees 含费用预算：$________________',10)
text(M,644,'________ shares 股 × $________ per share 每股 + $5 fee 佣金 = $____________',10)
text(M,665,'For a limit buy, calculate with the limit price; a market estimate can change.',9)
text(M,681,'限价买入按限价计算；市价单的实际成本可能变化。',9)
text(M,708,'Available cash after existing commitments 扣除已有订单占款后的可用现金：$__________',9.4)
text(M,735,'Cash we plan to keep 计划保留现金：$____________  Extra price buffer 价格余量：$________',9.3)
para(752,'Classroom limits: $10,000 per stock; $20,000 across the first 1-2 stocks, including fees. Cash only.<br/>课堂要求：每只股票最多1万美元，首次1-2只合计最多2万美元（含费）；不借款。',8.5)
footer(1); c.showPage()

# Back: group agreement, access fallback and an execution record.
text(M,43,'Check, hand over, then follow up',20,True)
text(M,66,'核对、提交与后续记录',15,True)
text(M,89,'Group 小组：________________      Company / ticker 公司／代码：________________',9.5)

section(104,'3','Agree on the exact order  商定准确订单')
box(M,148,'Company, BUY, shares, order type and any limit match our plan. 公司、操作、股数、类型及限价正确。',8.8)
box(M,174,'Cost plus a price buffer fits our cash and classroom budget. 成本与价格余量符合现金及课堂预算。',9)
text(M,201,'All three members agree 全组确认（initials 签名缩写）：________  ________  ________',9.5)
text(M,226,'Student entering the trade 负责输入交易的同学：________________________',10)

section(241,'4','Website access and teacher handoff  网站访问与老师代为输入')
box(M,284,'We can access SMG; our operator will enter the agreed order. 可以访问，由小组输入。',9.2)
box(M,310,'SMG is slow / unavailable; we hand this sheet to the teacher. 网站慢／无法访问，把本表交给老师。',9)
text(M,335,'Has anyone already tried to submit THIS order? 是否已尝试提交本笔订单？',10,True)
box(M,358,'No 未提交',9.5); box(M+125,358,'Yes 已提交',9.5); box(M+259,358,'Uncertain 不确定',9.5)
text(M,382,'If yes / uncertain: time, reference or message 如已提交或不确定，填写时间、编号或提示：',9.2)
line(406)
para(418,'<b>Teacher route:</b> check for an existing order first, then enter only the agreed details. Ask us before changing them. We will not submit another copy while the teacher handles this sheet.<br/><b>老师代为输入：</b>先检查是否已有订单，再按本表输入；如需修改，请先与小组确认。交表后小组不重复提交。',9.2)
text(M,482,'Keep passwords private; do not write them here. 密码保密，不写在本表上。',9,True)

section(496,'5','Trading hours  可成交时间  |  September 2026  2026年9月')
text(218,542,'US Eastern 美国东部',10,True)
text(397,542,'Beijing 北京',10,True)
line(550)
text(M,575,'Opens 开市',11,True)
text(218,575,'09:30',19,True)
text(397,575,'21:30',19,True)
line(586)
text(M,610,'Closes 收市',11,True)
text(218,610,'16:00',19,True)
text(397,610,'04:00',19,True)
text(467,610,'next day 次日',8.5)
para(622,'US Monday-Friday, except market holidays. 美国周一至周五，交易所假日除外。<br/>Outside these hours? Wait for the next opening. 休市时提交，等下次开市处理。',8.7,leading=13)

section(660,'6','Record after submission / execution  提交或成交后记录')
text(M,700,'Entered by 输入者：________  Beijing date / time 北京日期与时间：________________',9)
text(M,724,'Reference 编号：________________  Status 状态：____________________________',9)
text(M,748,'Executed shares 成交股数：______  Price 成交价：$______  Actual fees 实际费用：$______',9)
para(761,'Fee guide: standard SMG commission $5 per transaction; sales also have an SEC fee. Check Local Rules.<br/>费用：标准佣金每笔5美元，卖出另收SEC费用；核对本赛区规则。 Sources: stockmarketgame.org/rotg.html; nyse.com/trade/hours-calendars; NIST daylight-saving guidance. Checked 16 Sep 2026.',7.1,leading=10)
footer(2)
c.save()
print(OUT)
