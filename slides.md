class: center, middle

## SegWit

### How We Got Here and What Happens Next

<img src="img/boromir.png" height="400px">

---

class: center, middle

# Please ask questions!

---

# Agenda

- Who I am

- On politics

- Technicals
  - Scaling bitcoin
  - Transaction malleability
  - Segregated witness
  - UASF
  - Segwit2x

- Timeline
  - How we got here
  - What might happen next

- Predictions

- How to keep keep your coins safe while the dumpster fire burns itself out

---

# I'm just this guy, you know?

- Berkeley CS '09 🐻

- Cryptocurrency fanatic since 2013

- Worked at Chain Code Labs contributing to Bitcoin Core in 2015

---

class: center, middle

# On Politics

---

class: center, middle

# Technicals:
# Scaling bitcoin

---

#### Technicals: Scaling bitcoin

### Current block size limit

- 1,000,000 bytes (1MB)

- Introduced by Satoshi in 2010

- Not mentioned in release notes

- Blocks started hitting limit around October, 2016

---

#### Technicals: Scaling bitcoin

### Why not just increase the block size?

Increased block latency:

- Larger blocks take longer to propagate

- More time mining on top of "stale" blocks

- More time mining stale blocks means less hash power securing the network

- Incentivizes miners to be close together on the network

---

#### Technicals: Scaling bitcoin

### Why not just increase the block size?

Not all bytes in a block are equally "expensive":

- Bytes that increase the size of the unspent transaction output
    set (UTXO set) are most expensive

  - UTXO set must be kept in memory to quickly verify that new
      transactions are valid

- Signature data (also called witness data) is "cheapest":
  - Can be discarded after verifying
  - Do not enter the UTXO
  - Authorize spending of transactions, thus potentially reducing
      the size of the UTXO set

- Important to align transaction costs and resource costs

---

#### Technicals: Scaling bitcoin

### Why not just increase the block size?

Quadratic hashing vulnerability:

- Currently possible to create monster sized transactions that
    take a long time to verify

- Okay at 1MB, but becomes a problem as block size increases

- This can be fixed in other ways, but prevents simple bump to
    block size

---

#### Technicals: Scaling bitcoin

### Why not just increase the block size?

Some fee pressure is desirable:

- Bitcoin provides extremely durable, widely replicated storage

- Whatever the block size, transaction volume will eventually grow to fill it

- A limited block size prevents a huge volume of "low value"
    transactions from bloating the block chain

- Very subjective!

---

#### Technicals: Scaling bitcoin

### Why not just increase the block size?

Be wary of powerful attackers:

- Cryptocurrencies are in their infancy, but may come to challenge the
    legacy monetary and financial system

- This could pose an existential threat to very powerful actors,
    such as nation states and banks, who might seek to destroy it

- An increased block size increases the resources needed to run a
  full node, centralizing their operation and making them
  vulnerable to attack

---

class: center, middle

# Technicals:
# Transaction Malleability

---

#### Transaction malleability

### Transaction IDs

- Transaction data is hashed to produce transaction ID

- ID looks like `0xb14d...6130`

- Currently, signatures are part of hashed data:

<img src="img/current-hashing.svg" width="700">

###### Image from http://learnmeabitcoin.com/faq/segregated-witness

---

#### Transaction malleability

### Signatures are malleable

- The bits in a signature can be changed without invalidating it

- Can be done without access to private key

- Transaction ID will be completely different

<img src="img/transaction-malleability.svg">

###### Image from http://learnmeabitcoin.com/faq/segregated-witness

---

#### Technicals: Transaction Malleability

### Fixing TX malleability will make bitcoin more awesome

- Conditional transactions become easier:
  - "If transaction 0xF123D... is confirmed, do this..."

- Simplifies hardware and software wallet implementation

- Makes the lightning network much better and easier to implement

  Lightning network is _awesome_:
    - Micro transactions
    - Instant confirmation
    - Cross-chain atomic swaps

---

class: center, middle

# Technicals:
# Segregated witness

---

#### Technicals: Segregated witness

- Moves signatures out of transactions and into a separate structure

- Pre-segwit nodes can't see the witness data, to them, segwit
    transactions appear as anyone-can-spend transactions

- Because of the above, can be implemented as a soft-fork 

- Signatures make up 60% of the block chain, so increase can be
    significant

- Signature data stored in merkle tree with root in coinbase
    transaction

---

#### Technicals: Segregated witness

- Signatures are no longer part of data that determines txid hash

- Fixes all known sources of transaction malleability

<br>
<br>
<br>
<img src="img/segwit-hashing.svg" width="700">

###### Image from http://learnmeabitcoin.com/faq/segregated-witness

---

#### Technicals: Segregated witness

- As discussed before, signature data is less expensive than other
    transaction data

- Signature says that a transaction is authorized, but not what
    its effects are

- Only needed once, and then when bootstrapping new nodes

- Signatures authorize spending prior unspent transactions, thus
    allowing them to be removed from the UTXO set

- More signatures in TX = more reduction of UTXO set, thus makes
    sense to give them a discount

---

#### Technicals: Segregated witness

### The block weight formula

- Under segwit, 1,000,000 byte block size limit is replaced with
4,000,000 unit block weight limit:
  
  `block weight = base size * 3 + total size`

- Examples:
  - pre-segwit block with 1MB of base block data and no witness data:
  
      ```
      1,000,000 byte base size
      1,000,000 byte total size

      1,000,000 * 3 + 1,000,000 = 4,000,000 weight units
      ```

  - segwit block with 0.5MB of base block data and 1MB of witness data:
      
      ```
        500,000 byte base size
      1,500,000 byte total size

      500,000 * 3 + 2,000,000 = 3,500,000 weight units
      ```

- 4MB blocks possible, but 2.1MB blocks expected in practice

---

#### Technicals: Segregated witness

### Signature versioning

- Segwit adds a version byte to signatures

- New kinds of signatures can be added in future soft forks

- Paves the way for Schnorr signatures:
  - Faster to verify
  - Multiple signatures can be aggregated, improving scalability
  - Incentivizes coinjoin, improving privacy
  - Estimated to be a 40% capacity increase _on top of_ segwit increase

---

#### Technicals: Segregated witness

### Current segwit deployment: BIP 141

- Activates out using method described in BIP 9

- Chance to activate every 2016 blocks, coinciding with difficulty
    adjustment period

- 2016 blocks is ~2 weeks

- If 95% of blocks signal during that period, segwit will be
    locked in

- An additional 2 week period passes after lock in, at which point
    segwit activates

- Expires if not activated within two years

---

#### Technicals: Segregated witness

### Arguments for segwit

- Soft fork, so doesn't require whole network to upgrade

- Aligns incentives with resources costs

- Paves way for on-chain scaling improvements

- Paves way for layer-two scaling improvements

- Disables covert asic boost

- Ready now!

---

#### Technicals: Segregated witness

### Arguments against segwit

- Soft-fork is hacky

- Soft-fork means users must opt-out to retain status quo

- Anyone-can-spend transactions are an attack vector

- Unfair to non-segwit transactions

- Further incentivizes validationless mining

---

#### ~~Technicals~~ Opinions: Segregated witness

### My opinion on segwit and the scaling debate

- A 2x or even 10x block size incrase doesn't enable new use
    cases, but off-chain scaling does

- Efficiency before capacity

- A bitcoin that can run on a rasberry pis is stronger and
    more resiliant than one that can only run in a data center

- Good idea to wait for IBLT and weak / thin / soft blocks before
-   block size increase
  
- Centralization has momentum

---



class: center, middle

# Technicals:
# User Activated Soft Fork

---

#### Technicals: User Activated Soft Fork

- Proposed in BIP 148 by Shaolin Fry

- Attempts to lock in current BIP 9 segwit deployment by
    orphaning non-segwit signalling blocks starting on August 1st

- UASF chain have at least 15% of hash power to lock in segwit
    before it expires on November 15th

- Non-UASF chain can re-org into UASF chain, but reverse is not
    true

---

class: center, middle

# Technicals:
# Segwit2x

---

#### Technicals: Segwit2x

- Spearheaded by Barry Silbert and Digital Currency Group

- Attempts to lock in current BIP 9 segwit deployment by orphaning
    non-segwit signalling blocks, just like UASF

- Activation method is BIP 91:
    - Activation window every 336 blocks (2.3 days)
    - Locks in if 80% blocks in an activation window signal
    - Activates one window later

- Includes provisions to hard fork to a 2MB base block size 3 months
    after segwit activates 

- Impossible to make hard fork conditional on soft fork

---

class: center, middle

# Timeline

---

{% for entry in timeline %}

<div class="timeline">
  <div class="timeline-legend">
    <span>2010</span>
    <span>2018</span>
  </div>

  <div class="timeline-container {{entry.future_class}}">
    <div class="timeline-elapsed"   style="flex-grow: {{entry.elapsed}};"></div>
    <div class="timeline-remaining" style="flex-grow: {{entry.remaining}};">
      <div class="timeline-current"></div>
    </div>
  </div>

  <div class="timeline-current-date" style="left: {{entry.elapsed * 100}}%;">
    ·{{entry.display_date}}
  </div>
</div>

<div class="timeline-header">
  <h3>{{entry.title}}</h3>
</div>

{% if entry.img %}
<div class="capture" style="background-image: url('img/{{entry.img}}');"></div>
{% elif entry.url %}
<div class="capture" style="background-image: url('captures/{{entry.index}}-full.jpg');"></div>
{% endif %}

---
{% endfor %}

#### Predictions...

- Segwit will probably be locked in, one way or another

- Segwit2x HF will lose momentum:
  - Bitcoin Core will never merge it, and many will be reluctant
      to switch software

  - Congestion and fee pressure will start to abate once segwit
      locks in

  - Cool stuff like lightning network will start to provide
      2nd-layer scaling
  
  - Much less uncertainty
  
  - Economic nodes will not have any motivation to persue hard
      fork

---

#### It's all about the code!

A lot of what has happened in bitcoin can be viewed simply as an
attempt to take control of the reference implementation.

To turn this:

    github.com/bitcoin/bitcoin

Into one of these:

    github.com/BitcoinUnlimited/BitcoinUnlimited
    github.com/bitcoinclassic/bitcoinclassic
    github.com/bitcoinxt/bitcoinxt
    github.com/Bitcoin-ABC/bitcoin-abc
    github.com/btc1/bitcoin

---

class: center, middle

## How to keep keep your coins safe while the dumpster fire burns itself out

---

#### How to keep keep your coins safe while the dumpster fire burns itself out

### What we're trying to avoid:

- Trasaction replay attacks
  - Someone might replay a transaction on a chain other than the
      one you intended to transact on

- Technical incompetence
  - So many unknowns, service providers may just make bad
      decisions

- Unknown vulnerabilities
  - Lots of new and lightly tested code flying around,
      vulnerabilities and unexpected edge conditions are possible

- Weird policies on the part of exchanges and other service
    providers
  - May decide which chain is canonical and not allow withdrawing
      coins on another chain

---

#### How to keep keep your coins safe while the dumpster fire burns itself out

### How to protect yourself:

- Make sure you have control your private keys
  - A hardware wallet is the easiest way to do this
  - I like the Ledger Nano S
  - Don't leave this until the last minute!

- Don't transact until the dust has settled

- If you wind up with coins on multiple viable chains, be aware of
    best practices when you do decide to transact

- Good write up here:
    https://bitcoin.org/en/alert/2017-07-12-potential-split

---

#### How to keep keep your coins safe while the dumpster fire burns itself out

### But...

### All this goes out the window if you want to try to trade on what will surely be crazy volatility

---

### A brief note on finding things out!

- Many of the people in all corners of the bitcoin community are
    very accessible

- If you're polite and ask in the right venue, they're often more
    than happy to answer questions

- IRC channels:

    \#bitcoin, #bitcoin-dev, #bitcoin-core-dev, #bitcoin-wizards

- Slacks

- When you're curious about something, get out there and dig!

---

class: center, middle

# Questions?

---

# Thank you so much!

- Feel free to ping me on facebook, on the Blockchain @ Berkeley
    slack, or at casey@rodarmor.com with any questions or comments

- This presentation was created with remark: https://github.com/gnab/remark
